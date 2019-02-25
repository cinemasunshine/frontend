import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { convertToKatakana, createDataLayerGTM } from '../../functions';
import { TimeFormatPipe } from '../../pipes/time-format/time-format.pipe';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { CallNativeService } from '../call-native/call-native.service';
import { SasakiService } from '../sasaki/sasaki.service';
import { SaveType, StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

declare const ga: Function;

export type IIndividualScreeningEvent = factory.event.individualScreeningEvent.IEventWithOffer;
export type ICustomerContact = factory.transaction.placeOrder.ICustomerContact;
export type ISalesTicketResult = COA.services.reserve.ISalesTicketResult;
type IUnauthorizedCardOfMember = factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;
type IUncheckedCardTokenized = factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;

interface IData {
    /**
     * 取引
     */
    transaction?: factory.transaction.placeOrder.ITransaction;
    /**
     * 上映イベント
     */
    individualScreeningEvent?: IIndividualScreeningEvent;
    /**
     * 劇場ショップ
     */
    movieTheaterOrganization?: factory.organization.movieTheater.IPublicFields;
    /**
     * 販売可能チケット情報
     */
    salesTickets: ISalesTicketResult[];
    /**
     * 予約座席
     */
    seatReservationAuthorization?: factory.action.authorize.offer.seatReservation.IAction;
    /**
     * 予約座席(仮)
     */
    tmpSeatReservationAuthorization?: factory.action.authorize.offer.seatReservation.IAction;
    /**
     * オーダー回数
     */
    orderCount: number;
    /**
     * GMOトークンオブジェクト
     */
    gmoTokenObject?: IGmoTokenObject;
    /**
     * 支払いクレジットカード
     */
    paymentCreditCard?: IUnauthorizedCardOfMember | IUncheckedCardTokenized;
    /**
     * クレジットカードエラー
     */
    isCreditCardError: boolean;
    /**
     * 決済情報（クレジット）
     */
    creditCardAuthorization?: {
        id: string;
    };
    /**
     * 購入者情報
     */
    customerContact?: ICustomerContact;
    /**
     * ムビチケ券種情報
     */
    mvtkTickets: IMvtkTicket[];
    /**
     * ムビチケ使用情報
     */
    mvtkAuthorization?: {
        id: string;
    };
    /**
     * インセンティブ情報
     */
    pecorinoAwardAuthorization?: {
        id: string;
    };
    /**
     * インセンティブ
     */
    incentive: number;
    /**
     * ポイント券種情報
     */
    pointTickets: COA.services.master.ITicketResult[];
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}

export interface IMvtkTicket {
    mvtkTicketcodeResult: COA.services.master.IMvtkTicketcodeResult;
    knyknrNoInfo: mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberInfo;
    ykknInfo: mvtkReserve.services.auth.purchaseNumberAuth.IValidTicket;
    input?: {
        knyknrNo: string;
        pinCd: string;
    };
}

/**
 * インセンティブ
 */
enum Incentive {
    WatchingMovies = 1
}

@Injectable()
export class PurchaseService {

    public data: IData;

    constructor(
        private storage: StorageService,
        private sasaki: SasakiService,
        private awsCognito: AwsCognitoService,
        private callNative: CallNativeService,
        private user: UserService
    ) {
        this.load();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: IData | null = this.storage.load('purchase', SaveType.Session);
        if (data === null) {
            this.data = {
                salesTickets: [],
                mvtkTickets: [],
                pointTickets: [],
                orderCount: 0,
                incentive: 0,
                isCreditCardError: false
            };

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save('purchase', this.data, SaveType.Session);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        this.data = {
            salesTickets: [],
            mvtkTickets: [],
            pointTickets: [],
            orderCount: 0,
            incentive: 0,
            isCreditCardError: false
        };
        this.save();
    }

    /**
     * 顧客名取得（カタカナ）
     */
    public getCustomerName() {
        if (this.data.customerContact === undefined) {
            return '';
        }
        return convertToKatakana(`${this.data.customerContact.familyName} ${this.data.customerContact.givenName}`);
    }

    /**
     * 期限切れ
     * @method isExpired
     */
    public isExpired() {
        if (this.data.transaction === undefined) {
            throw new Error('status is different');
        }
        const expires = moment(this.data.transaction.expires).unix();
        const now = moment().unix();
        let result = false;
        if (expires < now) {
            result = true;
        }

        return result;
    }

    /**
     * 販売可能時間判定
     * @method isSalseTime
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalseTime(screeningEvent: IIndividualScreeningEvent): boolean {
        const END_TIME = 30; // 30分前

        return (moment().unix() < moment(screeningEvent.startDate).subtract(END_TIME, 'minutes').unix());
    }

    /**
     * 販売可能判定
     * @method isSalse
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalse(screeningEvent: IIndividualScreeningEvent): boolean {
        const PRE_SALE = '1'; // 先行販売

        return (moment(screeningEvent.coaInfo.rsvStartDate).unix() <= moment().unix()
            || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;

        return individualScreeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;

        return individualScreeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;

        return individualScreeningEvent.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;
        moment.locale('ja');

        return moment(individualScreeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            individualScreeningEvent.startDate,
            individualScreeningEvent.coaInfo.dateJouei
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate(): string {
        if (this.data.individualScreeningEvent === undefined) {
            return '';
        }
        const individualScreeningEvent = this.data.individualScreeningEvent;
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            individualScreeningEvent.endDate,
            individualScreeningEvent.coaInfo.dateJouei
        );
    }

    /**
     * 合計金額計算
     * @method getTotalPrice
     */
    public getTotalPrice(): number {
        let result = 0;
        if (this.data.seatReservationAuthorization === undefined) {
            return result;
        }
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            result += offer.ticketInfo.salePrice;
        }

        return result;
    }

    /**
     * ムビチケ合計金額計算
     * @method getTotalPrice
     */
    public getMvtkTotalPrice(): number {
        let result = 0;
        if (this.data.seatReservationAuthorization === undefined) {
            return result;
        }
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            result += offer.ticketInfo.mvtkSalesPrice;
        }

        return result;
    }

    /**
     * メンバーズの券種コード取得
     * @method getMemberTicketCode
     * @returns {string[]}
     */
    public getMemberTicketCode(): string[] {
        if (this.data.individualScreeningEvent === undefined) {
            return [];
        }
        const branchCode = this.data.movieTheaterOrganization ?
            this.data.movieTheaterOrganization.location.branchCode : undefined;
        const memberTicket = environment.MEMBER_TICKET.find((data) => data.THEATER === branchCode);
        if (memberTicket === undefined) {
            return [];
        }
        return memberTicket.TICKET_CODE;
    }

    /**
     * ムビチケ対応作品判定
     * @method isUsedMvtk
     * @returns {boolean}
     */
    public isUsedMvtk(): boolean {
        if (this.data.individualScreeningEvent === undefined) {
            return false;
        }
        const today = moment().format('YYYYMMDD');
        const coaInfo = this.data.individualScreeningEvent.superEvent.coaInfo;

        return (coaInfo.flgMvtkUse === '1'
            && coaInfo.dateMvtkBegin !== undefined
            && Number(coaInfo.dateMvtkBegin) <= Number(today));
    }

    /**
     * ポイント対応作品判定
     * @method isUsedPoint
     * @returns {boolean}
     */
    public isUsedPoint(): boolean {
        if (this.data.salesTickets.length === 0
            || this.data.individualScreeningEvent === undefined) {
            return false;
        }

        const individualScreeningEvent = this.data.individualScreeningEvent;

        const pointInfo = environment.POINT_TICKET.find((ticket) => {
            return ticket.THEATER === individualScreeningEvent.coaInfo.theaterCode;
        });

        if (pointInfo === undefined) {
            return false;
        }

        const pointTicketCodeList = pointInfo.TICKET_CODE;

        const pointTickets = this.data.salesTickets.filter((salesTicket) => {
            const ticketCode = pointTicketCodeList.find((pointTicketcode) => {
                return pointTicketcode === salesTicket.ticketCode;
            });

            return ticketCode !== undefined;
        });

        return pointTickets.length > 0;
    }

    /**
     * ポイントでの予約判定
     * @method isReserveMvtk
     * @returns {boolean}
     */
    public isReserveMvtk(): boolean {
        let result = false;
        if (this.data.seatReservationAuthorization === undefined) {
            return result;
        }
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            if (offer.ticketInfo.mvtkNum !== '') {
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * インセンティブ判定
     * @method isIncentive
     * @returns {boolean}
     */
    public isIncentive(): boolean {
        if (this.data.seatReservationAuthorization === undefined) {
            return false;
        }
        const pointTickets: COA.services.master.ITicketResult[] = [];
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            const pointTicket = this.data.pointTickets.find((ticket) => {
                return (ticket.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (pointTicket !== undefined) {
                pointTickets.push(pointTicket);
            }
        }

        return (pointTickets.length !== this.data.seatReservationAuthorization.object.offers.length);
    }

    /**
     * ポイントでの予約判定
     * @method isReservePoint
     * @returns {boolean}
     */
    public isReservePoint(): boolean {
        let result = false;
        if (this.data.seatReservationAuthorization === undefined
            || this.data.pointTickets.length === 0) {
            return result;
        }
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            const pointTickets = this.data.pointTickets.filter((ticket) => {
                return (ticket.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (pointTickets.length > 0) {
                result = true;
                break;
            }
        }

        return result;
    }

    /**
     * ムビチケ着券情報取得
     * @method getMvtkSeatInfoSync
     */
    public getMvtkSeatInfoSync(options?: {
        deleteFlag?: string
        reservedDeviceType?: string
    }) {
        if (this.data.seatReservationAuthorization === undefined
            || this.data.seatReservationAuthorization.result === undefined
            || this.data.individualScreeningEvent === undefined
            || this.data.mvtkTickets === undefined) {
            throw new Error('status is different');
        }
        const mvtkPurchaseNoInfoList: mvtkReserve.services.seat.seatInfoSync.IKnyknrNoInfo[] = [];
        const mvtkseat: { zskCd: string; }[] = [];

        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            const mvtkTicket = this.data.mvtkTickets.find((ticket) => {
                return (ticket.knyknrNoInfo.knyknrNo === offer.ticketInfo.mvtkNum
                    && ticket.mvtkTicketcodeResult.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (mvtkTicket === undefined || mvtkTicket.input === undefined) {
                continue;
            }
            const mvtkPurchaseNoInfo = mvtkPurchaseNoInfoList.find((info) => {
                return (info.knyknrNo === mvtkTicket.knyknrNoInfo.knyknrNo);
            });
            if (mvtkPurchaseNoInfo !== undefined) {
                const knshInfo = mvtkPurchaseNoInfo.knshInfo.find((info) => {
                    return (info.knshTyp === mvtkTicket.ykknInfo.ykknshTyp);
                });
                if (knshInfo !== undefined) {
                    knshInfo.miNum += 1;
                } else {
                    mvtkPurchaseNoInfo.knshInfo.push({
                        knshTyp: mvtkTicket.ykknInfo.ykknshTyp,
                        miNum: 1
                    });
                }
            } else {
                mvtkPurchaseNoInfoList.push({
                    knyknrNo: mvtkTicket.knyknrNoInfo.knyknrNo,
                    pinCd: mvtkTicket.input.pinCd,
                    knshInfo: [{
                        knshTyp: mvtkTicket.ykknInfo.ykknshTyp,
                        miNum: 1
                    }]
                });
            }
            mvtkseat.push({ zskCd: offer.seatNumber });
        }
        if (mvtkPurchaseNoInfoList.length === 0 || mvtkseat.length === 0) {
            throw new Error('status is different');
        }
        const DIGITS = -2;
        const coaInfo = this.data.individualScreeningEvent.coaInfo;
        const day = moment(coaInfo.dateJouei).format('YYYY/MM/DD');
        const time = `${new TimeFormatPipe().transform(this.data.individualScreeningEvent.startDate, coaInfo.dateJouei)}:00`;
        const tmpReserveNum = this.data.seatReservationAuthorization.result.updTmpReserveSeatResult.tmpReserveNum;
        const systemReservationNumber = `${coaInfo.dateJouei}${tmpReserveNum}`;
        const siteCode = String(Number(`00${coaInfo.theaterCode}`.slice(DIGITS)));
        const deleteFlag = (options === undefined || options.deleteFlag === undefined) ? '0' : options.deleteFlag;
        const reservedDeviceType = (options === undefined || options.reservedDeviceType === undefined) ? '02' : options.reservedDeviceType;
        const skhnCd = `${coaInfo.titleCode}${`00${coaInfo.titleBranchNum}`.slice(DIGITS)}`;

        return {
            kgygishCd: environment.MVTK_COMPANY_CODE,
            yykDvcTyp: reservedDeviceType,
            trkshFlg: deleteFlag,
            kgygishSstmZskyykNo: systemReservationNumber,
            kgygishUsrZskyykNo: String(tmpReserveNum),
            jeiDt: `${day} ${time}`,
            kijYmd: day,
            stCd: siteCode,
            screnCd: coaInfo.screenCode,
            knyknrNoInfo: mvtkPurchaseNoInfoList,
            zskInfo: mvtkseat,
            skhnCd: skhnCd
        };
    }

    /**
     * 取引開始処理
     * @method transactionStartProcess
     */
    public async transactionStartProcess(args: {
        passportToken: string;
        individualScreeningEvent: IIndividualScreeningEvent
    }) {
        // 購入データ削除
        this.reset();
        this.data.individualScreeningEvent = args.individualScreeningEvent;
        await this.sasaki.getServices();
        // 劇場のショップを検索
        this.data.movieTheaterOrganization = await this.sasaki.organization.findMovieTheaterByBranchCode({
            branchCode: this.data.individualScreeningEvent.coaInfo.theaterCode
        });
        // 取引期限
        const VALID_TIME = 10;
        const expires = moment().add(VALID_TIME, 'minutes').toDate();
        // 取引開始
        this.data.transaction = await this.sasaki.transaction.placeOrder.start({
            expires: expires,
            sellerId: this.data.movieTheaterOrganization.id,
            passportToken: args.passportToken
        });
        this.save();
    }

    /**
     * 座席開放処理
     * @method cancelSeatRegistrationProcess
     */
    public async cancelSeatRegistrationProcess() {
        if (this.data.transaction === undefined
            || this.data.tmpSeatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        const cancelSeatReservationArgs = {
            transactionId: this.data.transaction.id,
            actionId: this.data.tmpSeatReservationAuthorization.id
        };
        await this.sasaki.transaction.placeOrder.cancelSeatReservationAuthorization(cancelSeatReservationArgs);
        this.data.tmpSeatReservationAuthorization = undefined;
        this.reset();
    }

    /**
     * 座席登録処理
     * @method seatRegistrationProcess
     */
    public async seatRegistrationProcess(offers: factory.offer.seatReservation.IOffer[]) {
        if (this.data.transaction === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        // 予約中なら座席削除
        if (this.data.tmpSeatReservationAuthorization !== undefined) {
            const cancelSeatReservationArgs = {
                transactionId: this.data.transaction.id,
                actionId: this.data.tmpSeatReservationAuthorization.id
            };
            await this.sasaki.transaction.placeOrder.cancelSeatReservationAuthorization(cancelSeatReservationArgs);
            this.data.tmpSeatReservationAuthorization = undefined;
            this.save();
        }
        // 座席登録
        const createSeatReservationAuthorizationArgs = {
            transactionId: this.data.transaction.id,
            eventIdentifier: this.data.individualScreeningEvent.identifier,
            offers: offers
        };
        this.data.tmpSeatReservationAuthorization =
            await this.sasaki.transaction.placeOrder.createSeatReservationAuthorization(createSeatReservationAuthorizationArgs);
        this.data.orderCount = 0;
        this.data.seatReservationAuthorization = undefined;
        this.save();
    }

    /**
     * 券種登録処理
     * @method ticketRegistrationProcess
     */
    public async ticketRegistrationProcess(offers: factory.offer.seatReservation.IOffer[]) {
        if (this.data.transaction === undefined
            || this.data.tmpSeatReservationAuthorization === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        const changeSeatReservationArgs = {
            transactionId: this.data.transaction.id,
            actionId: this.data.tmpSeatReservationAuthorization.id,
            eventIdentifier: this.data.individualScreeningEvent.identifier,
            offers: offers
        };
        // console.log('changeSeatReservationArgs', changeSeatReservationArgs);
        this.data.seatReservationAuthorization =
            await this.sasaki.transaction.placeOrder.changeSeatReservationOffers(changeSeatReservationArgs);
        if (this.data.seatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        if (this.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            const cancelCreditCardAuthorizationArgs = {
                transactionId: this.data.transaction.id,
                actionId: this.data.creditCardAuthorization.id
            };
            await this.sasaki.transaction.placeOrder.cancelCreditCardAuthorization(cancelCreditCardAuthorizationArgs);
            this.data.creditCardAuthorization = undefined;
            this.save();
        }
        this.save();
    }

    /**
     * 購入者情報登録処理
     * @method customerContactRegistrationProcess
     */
    public async customerContactRegistrationProcess(args: factory.transaction.placeOrder.ICustomerContact) {
        if (this.data.transaction === undefined) {
            throw new Error('transaction is undefined');
        }
        await this.sasaki.getServices();
        // 入力情報を登録
        this.data.customerContact = await this.sasaki.transaction.placeOrder.setCustomerContact({
            transactionId: this.data.transaction.id,
            contact: args
        });
        if (this.user.isNative() && !this.user.isMember()) {
            try {
                const updateRecordsArgs = {
                    datasetName: 'profile',
                    value: {
                        familyName: convertToKatakana(args.familyName),
                        givenName: convertToKatakana(args.givenName),
                        email: args.email,
                        telephone: args.telephone
                    }
                };
                await this.awsCognito.updateRecords(updateRecordsArgs);
            } catch (err) {
                console.error(err);
            }
        }

        this.save();
    }

    /**
     * クレジットカード支払い処理
     */
    public async creditCardPaymentProcess() {
        if (this.data.transaction === undefined
            || this.data.paymentCreditCard === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        if (this.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            const cancelCreditCardAuthorizationArgs = {
                transactionId: this.data.transaction.id,
                actionId: this.data.creditCardAuthorization.id
            };
            await this.sasaki.transaction.placeOrder.cancelCreditCardAuthorization(cancelCreditCardAuthorizationArgs);
            this.data.creditCardAuthorization = undefined;
            this.save();
        }
        // クレジットカード登録
        const METHOD_LUMP = '1';
        const createCreditCardAuthorizationArgs = {
            transactionId: this.data.transaction.id,
            orderId: this.createOrderId(),
            amount: this.getTotalPrice(),
            method: METHOD_LUMP,
            creditCard: this.data.paymentCreditCard
        };
        this.data.creditCardAuthorization =
            await this.sasaki.transaction.placeOrder.createCreditCardAuthorization(createCreditCardAuthorizationArgs);
        this.save();
    }

    /**
     * オーダーID生成
     * @method createOrderId
     */
    private createOrderId() {
        if (this.data.seatReservationAuthorization === undefined
            || this.data.seatReservationAuthorization.result === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        const DIGITS = {
            '02': -2,
            '08': -8
        };
        const orderCount = `00${this.data.orderCount}`.slice(DIGITS['02']);
        const tmpReserveNum =
            `00000000${this.data.seatReservationAuthorization.result.updTmpReserveSeatResult.tmpReserveNum}`.slice(DIGITS['08']);
        const theaterCode = this.data.individualScreeningEvent.coaInfo.theaterCode;
        const reserveDate = moment().format('YYYYMMDD');
        this.data.orderCount += 1;
        // オーダーID 予約日 + 劇場ID(3桁) + 予約番号(8桁) + オーソリカウント(2桁)
        return `${reserveDate}${theaterCode}${tmpReserveNum}${orderCount}`;
    }

    /**
     * インセンティブ処理
     */
    public async incentiveProcess() {
        if (this.data.transaction === undefined
            || this.user.data.account === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        this.data.pecorinoAwardAuthorization = await this.sasaki.transaction.placeOrder.createPecorinoAwardAuthorization({
            transactionId: this.data.transaction.id,
            amount: Incentive.WatchingMovies,
            toAccountNumber: this.user.data.account.accountNumber,
            notes: '鑑賞'
        });
        this.data.incentive = Incentive.WatchingMovies;
    }

    /**
     * ポイント決済処理
     */
    public async pointPaymentProcess() {
        if (this.data.transaction === undefined
            || this.user.data.account === undefined
            || this.data.seatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        const ticketNames = [];
        let usePoint = 0;
        for (const offer of this.data.seatReservationAuthorization.object.offers) {
            const pointTicket = this.data.pointTickets.find((ticket) => {
                return (ticket.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (pointTicket === undefined) {
                continue;
            }
            ticketNames.push(`${offer.ticketInfo.ticketName} 引換`);
            usePoint += pointTicket.usePoint;
        }

        const notes = ticketNames.join(',');

        await this.sasaki.transaction.placeOrder.createPecorinoPaymentAuthorization({
            transactionId: this.data.transaction.id,
            amount: usePoint,
            fromAccountNumber: this.user.data.account.accountNumber,
            notes: notes
        });
    }

    /**
     * 購入登録処理
     */
    public async purchaseRegistrationProcess() {
        if (this.data.transaction === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        if (this.isReserveMvtk()) {
            // ムビチケ使用
            const mvtksSatInfoSyncArgs = this.getMvtkSeatInfoSync();
            await this.sasaki.mvtksSatInfoSync(mvtksSatInfoSyncArgs);
        }
        let order;
        try {
            if (this.isReserveMvtk()) {
                // 決済方法として、ムビチケを追加する
                const createMvtkAuthorizationArgs = {
                    transactionId: this.data.transaction.id,
                    mvtk: {
                        typeOf: factory.action.authorize.discount.mvtk.ObjectType.Mvtk,
                        price: this.getMvtkTotalPrice(),
                        seatInfoSyncIn: this.getMvtkSeatInfoSync()
                    }
                };
                // console.log('createMvtkAuthorizationArgs', createMvtkAuthorizationArgs);
                this.data.mvtkAuthorization =
                    await this.sasaki.transaction.placeOrder.createMvtkAuthorization(createMvtkAuthorizationArgs);
            }
            const incentives = [];
            if (this.user.isMember()
                && !this.isReservePoint()
                && this.user.data.account !== undefined) {
                incentives.push({
                    amount: Incentive.WatchingMovies,
                    toAccountNumber: this.user.data.account.accountNumber
                });
            }
            // 取引確定
            order = await this.sasaki.transaction.placeOrder.confirm({
                transactionId: this.data.transaction.id,
                incentives: incentives
            });
        } catch (err) {
            if (this.isReserveMvtk()) {
                await this.cancelMvtksSatInfoSync(0);
            }
            throw err;
        }

        const complete = {
            order: order,
            transaction: this.data.transaction,
            movieTheaterOrganization: this.data.movieTheaterOrganization,
            incentive: this.data.incentive
        };
        this.storage.save('complete', complete, SaveType.Session);

        try {
            // Google Analytics
            const sendData = {
                hitType: 'event',
                eventCategory: 'purchase',
                eventAction: 'complete',
                eventLabel: `conversion-${this.data.individualScreeningEvent.coaInfo.theaterCode}`
            };
            ga('send', sendData);
        } catch (err) {
            console.error(err);
        }

        if (this.user.isNative() && !this.user.isMember()) {
            // アプリ非会員ならCognitoへ登録
            try {
                const reservationRecord = await this.awsCognito.getRecords({
                    datasetName: 'reservation'
                });
                if (reservationRecord.orders === undefined) {
                    reservationRecord.orders = [];
                }
                reservationRecord.orders.push(order);
                (<factory.order.IOrder[]>reservationRecord.orders).forEach((recordOrder, index) => {
                    const itemOffered = recordOrder.acceptedOffers[0].itemOffered;
                    if (itemOffered.typeOf !== factory.reservationType.EventReservation) {
                        return;
                    }
                    const endDate = moment(itemOffered.reservationFor.endDate).unix();
                    const limitDate = moment().subtract(1, 'month').unix();
                    if (endDate < limitDate) {
                        reservationRecord.orders.splice(index, 1);
                    }
                });
                const updateRecordsArgs = {
                    datasetName: 'reservation',
                    value: reservationRecord
                };
                await this.awsCognito.updateRecords(updateRecordsArgs);
            } catch (err) {
                console.error('awsCognito: updateRecords', err);
            }
        }
        // プッシュ通知登録
        try {
            if (this.user.isNative()) {
                const itemOffered = order.acceptedOffers[0].itemOffered;
                if (itemOffered.typeOf !== factory.reservationType.EventReservation) {
                    throw new Error('itemOffered.typeOf is not EventReservation');
                }
                const reservationFor = itemOffered.reservationFor;
                const localNotificationArgs = {
                    id: Number(order.orderNumber.replace(/\-/g, '')), // ID
                    title: '鑑賞時間が近づいています。', // タイトル
                    text: '劇場 / スクリーン: ' + reservationFor.superEvent.location.name.ja + '/' + reservationFor.location.name.ja + '\n' +
                        '作品名: ' + reservationFor.workPerformed.name + '\n' +
                        '上映開始: ' + moment(reservationFor.startDate).format('YYYY/MM/DD HH:mm'), // テキスト
                    trigger: {
                        at: moment(reservationFor.startDate).subtract(30, 'minutes').toISOString() // 通知を送る時間（ISO）
                    },
                    foreground: true // 前面表示（デフォルトは前面表示しない）
                };
                this.callNative.localNotification(localNotificationArgs);
            }
        } catch (err) {
            console.error(err);
        }

        try {
            // eコマース
            (<any>window).dataLayer = (<any>window).dataLayer || [];
            (<any>window).dataLayer.push(createDataLayerGTM({
                order,
                native: this.user.isNative(),
                member: this.user.isMember()
            }));
        } catch (err) {
            console.error(err);
        }

        // 購入情報削除
        this.reset();
    }

    /**
     * ムビチケ着券取り消し
     */
    public async cancelMvtksSatInfoSync(count: number) {
        // console.log('cancelMvtksSatInfoSync', count);
        try {
            // ムビチケ使用なら削除
            const deleteFlag = '1';
            const mvtksSatInfoSyncArgs = this.getMvtkSeatInfoSync({
                deleteFlag: deleteFlag
            });
            await this.sasaki.mvtksSatInfoSync(mvtksSatInfoSyncArgs);
        } catch (err) {
            const limit = 3;
            if (count > limit) {
                throw err;
            }
            await this.cancelMvtksSatInfoSync(count + 1);
        }

    }

    /**
     * ムビチケ認証処理
     */
    public async mvtkAuthenticationProcess(mvtkInputDataList: {
        knyknrNo: string;
        pinCd: string;
    }[]) {
        if (this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        const DIGITS = -2;
        const coaInfo = this.data.individualScreeningEvent.coaInfo;
        const valid = '1';
        const purchaseNumberAuthArgs = {
            kgygishCd: environment.MVTK_COMPANY_CODE,
            jhshbtsCd: <any>valid,
            knyknrNoInfoIn: mvtkInputDataList,
            skhnCd: coaInfo.titleCode + `00${coaInfo.titleBranchNum}`.slice(DIGITS),
            stCd: Number(coaInfo.theaterCode.slice(DIGITS)).toString(),
            jeiYmd: moment(coaInfo.dateJouei).format('YYYY/MM/DD')
        };
        const mvtkPurchaseNumberAuthResult = await this.sasaki.mvtkPurchaseNumberAuth(purchaseNumberAuthArgs);
        const success = 'N000';
        if (mvtkPurchaseNumberAuthResult.resultInfo.status !== success
            || mvtkPurchaseNumberAuthResult.ykknmiNumSum === null
            || mvtkPurchaseNumberAuthResult.ykknmiNumSum === 0
            || mvtkPurchaseNumberAuthResult.knyknrNoInfoOut === null) {
            throw new Error('mvtkPurchaseNumberAuth error');
        }
        const results = [];
        for (const knyknrNoInfo of mvtkPurchaseNumberAuthResult.knyknrNoInfoOut) {
            if (knyknrNoInfo.ykknInfo === null) {
                continue;
            }
            for (const ykknInfo of knyknrNoInfo.ykknInfo) {
                const mvtkTicketcodeArgs = {
                    theaterCode: coaInfo.theaterCode,
                    kbnDenshiken: knyknrNoInfo.dnshKmTyp,
                    kbnMaeuriken: knyknrNoInfo.znkkkytsknGkjknTyp,
                    kbnKensyu: ykknInfo.ykknshTyp,
                    salesPrice: Number(ykknInfo.knshknhmbiUnip),
                    appPrice: Number(ykknInfo.kijUnip),
                    kbnEisyahousiki: ykknInfo.eishhshkTyp,
                    titleCode: coaInfo.titleCode,
                    titleBranchNum: coaInfo.titleBranchNum,
                    dateJouei: coaInfo.dateJouei
                };
                const mvtkTicketcodeResult = await this.sasaki.mvtkTicketcode(mvtkTicketcodeArgs);
                // console.log('mvtkTicketcodeResult', mvtkTicketcodeResult);
                const data = {
                    mvtkTicketcodeResult: mvtkTicketcodeResult,
                    knyknrNoInfo: knyknrNoInfo,
                    ykknInfo: ykknInfo,
                    input: mvtkInputDataList.find((mvtkInputData) => {
                        return (mvtkInputData.knyknrNo === knyknrNoInfo.knyknrNo);
                    })
                };
                results.push(data);
            }
        }
        this.data.mvtkTickets = results;
        this.save();
    }
}
