import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { convertToKatakana, getPurchaseCompletionAppEmail, getPurchaseCompletionEmail } from '../../functions';
import { TimeFormatPipe } from '../../pipes/time-format/time-format.pipe';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { CallNativeService } from '../call-native/call-native.service';
import { SasakiService } from '../sasaki/sasaki.service';
import { SaveType, StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

declare const ga: Function;

export type ISalesTicketResult = COA.services.reserve.ISalesTicketResult;
type IUnauthorizedCardOfMember = factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;
type IUncheckedCardTokenized = factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;

export interface IPurchaseData {
    /**
     * 取引
     */
    transaction?: factory.transaction.placeOrder.ITransaction;
    /**
     * 上映イベント
     */
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    /**
     * 劇場ショップ
     */
    seller?: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    /**
     * 販売可能チケット情報
     */
    salesTickets: ISalesTicketResult[];
    /**
     * 予約座席
     */
    seatReservationAuthorization?: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>;
    /**
     * 予約座席(仮)
     */
    tmpSeatReservationAuthorization?: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>;
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
    customerContact?: factory.person.IProfile;
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

    public data: IPurchaseData;

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
        const data: IPurchaseData | null = this.storage.load('purchase', SaveType.Session);
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
     * @param {factory.chevre.event.screeningEvent.IEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalseTime(screeningEvent: factory.chevre.event.screeningEvent.IEvent): boolean {
        const END_TIME = 30; // 30分前

        return (moment().unix() < moment(screeningEvent.startDate).subtract(END_TIME, 'minutes').unix());
    }

    /**
     * 販売可能判定
     * @method isSalse
     * @param {factory.chevre.event.screeningEvent.IEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalse(screeningEvent: factory.chevre.event.screeningEvent.IEvent): boolean {
        if (screeningEvent.offers === undefined) {
            return false;
        }

        return (moment(screeningEvent.offers.validFrom).unix() <= moment().unix());
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName(): string {
        if (this.data.screeningEvent === undefined) {
            return '';
        }
        const screeningEvent = this.data.screeningEvent;

        return screeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName(): string {
        if (this.data.screeningEvent === undefined) {
            return '';
        }
        const screeningEvent = this.data.screeningEvent;

        return screeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle(): string {
        if (this.data.screeningEvent === undefined) {
            return '';
        }
        const screeningEvent = this.data.screeningEvent;

        return screeningEvent.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate(): string {
        if (this.data.screeningEvent === undefined) {
            return '';
        }
        const screeningEvent = this.data.screeningEvent;
        moment.locale('ja');

        return moment(screeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            screeningEvent.startDate,
            screeningEvent.coaInfo.dateJouei
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            screeningEvent.endDate,
            screeningEvent.coaInfo.dateJouei
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
        this.data.seatReservationAuthorization.object.acceptedOffer.forEach((offer: any) => {
            result += offer.ticketInfo.salePrice;
        });

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
        this.data.seatReservationAuthorization.object.acceptedOffer.forEach((offer: any) => {
            result += offer.ticketInfo.mvtkSalesPrice;
        });

        return result;
    }

    /**
     * メンバーズの券種コード取得
     * @method getMemberTicketCode
     * @returns {string[]}
     */
    public getMemberTicketCode(): string[] {
        if (this.data.screeningEvent === undefined) {
            return [];
        }
        const branchCode = (this.data.seller !== undefined && this.data.seller.location !== undefined)
            ? this.data.seller.location.branchCode : undefined;
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
        if (this.data.screeningEvent === undefined) {
            return false;
        }
        const today = moment().format('YYYYMMDD');
        const coaInfo = this.data.screeningEvent.superEvent.coaInfo;

        return (coaInfo !== undefined
            && coaInfo.flgMvtkUse === '1'
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
            || this.data.screeningEvent === undefined) {
            return false;
        }

        const screeningEvent = this.data.screeningEvent;

        const pointInfo = environment.POINT_TICKET.find((ticket) => {
            return (screeningEvent.coaInfo !== undefined
                && ticket.THEATER === screeningEvent.coaInfo.theaterCode);
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
        if (this.data.seatReservationAuthorization === undefined) {
            return false;
        }
        const findResult = this.data.seatReservationAuthorization.object.acceptedOffer.find((offer: any) => {
            return (offer.ticketInfo.mvtkNum !== '');
        });
        return (findResult !== undefined);
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
        this.data.seatReservationAuthorization.object.acceptedOffer.forEach((offer: any) => {
            const pointTicket = this.data.pointTickets.find((ticket) => {
                return (ticket.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (pointTicket !== undefined) {
                pointTickets.push(pointTicket);
            }
        });

        return (pointTickets.length !== this.data.seatReservationAuthorization.object.acceptedOffer.length);
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
        for (const offer of this.data.seatReservationAuthorization.object.acceptedOffer) {
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
            || this.data.screeningEvent === undefined
            || this.data.mvtkTickets === undefined) {
            throw new Error('status is different');
        }
        const mvtkPurchaseNoInfoList: mvtkReserve.services.seat.seatInfoSync.IKnyknrNoInfo[] = [];
        const mvtkseat: { zskCd: string; }[] = [];

        for (const offer of this.data.seatReservationAuthorization.object.acceptedOffer) {
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
        const coaInfo = this.data.screeningEvent.coaInfo;
        if (coaInfo === undefined) {
            throw new Error('coaInfo is undefined');
        }
        const day = moment(coaInfo.dateJouei).format('YYYY/MM/DD');
        const time = `${new TimeFormatPipe().transform(this.data.screeningEvent.startDate, coaInfo.dateJouei)}:00`;
        const tmpReserveNum = (<any>this.data.seatReservationAuthorization.result.responseBody).tmpReserveNum;
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
        screeningEvent: factory.chevre.event.screeningEvent.IEvent
    }) {
        // 購入データ削除
        this.reset();
        this.data.screeningEvent = args.screeningEvent;
        await this.sasaki.getServices();
        if (this.data.screeningEvent.superEvent.location === undefined
            || this.data.screeningEvent.superEvent.location.branchCode === undefined) {
            throw new Error('branchCode is undefined');
        }
        const branchCode = this.data.screeningEvent.superEvent.location.branchCode;
        // 劇場のショップを検索
        const searchResult = await this.sasaki.seller.search({
            location: { branchCodes: [branchCode] }
        });
        this.data.seller = searchResult.data[0];
        this.save();
        await this.sasaki.getServices();
        // 取引期限
        const VALID_TIME = 10;
        const expires = moment().add(VALID_TIME, 'minutes').toDate();
        // 取引開始
        this.data.transaction = await this.sasaki.transaction.placeOrder.start({
            expires: expires,
            seller: {
                typeOf: this.data.seller.typeOf,
                id: this.data.seller.id
            },
            object: { passport: { token: args.passportToken } }
        });
        this.save();
    }

    /**
     * 座席開放処理
     * @method cancelSeatRegistrationProcess
     */
    public async cancelSeatRegistrationProcess() {
        if (this.data.tmpSeatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        await this.sasaki.transaction.placeOrder.cancelSeatReservationAuthorization({
            id: this.data.tmpSeatReservationAuthorization.id,
            purpose: this.data.tmpSeatReservationAuthorization.purpose
        });
        this.data.tmpSeatReservationAuthorization = undefined;
        this.reset();
    }

    /**
     * 座席登録処理
     * @method seatRegistrationProcess
     */
    public async seatRegistrationProcess(offers: factory.offer.seatReservation.IOffer[]) {
        if (this.data.transaction === undefined
            || this.data.screeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        // 予約中なら座席削除
        if (this.data.tmpSeatReservationAuthorization !== undefined) {
            await this.sasaki.transaction.placeOrder.cancelSeatReservationAuthorization({
                id: this.data.tmpSeatReservationAuthorization.id,
                purpose: this.data.tmpSeatReservationAuthorization.purpose
            });
            this.data.tmpSeatReservationAuthorization = undefined;
            this.save();
        }
        // 座席登録
        this.data.tmpSeatReservationAuthorization =
            await this.sasaki.transaction.placeOrder.createSeatReservationAuthorization({
                object: {
                    event: {
                        id: this.data.screeningEvent.id
                    },
                    acceptedOffer: offers
                },
                purpose: {
                    id: this.data.transaction.id,
                    typeOf: this.data.transaction.typeOf
                }
            });
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
            || this.data.screeningEvent === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        // console.log('changeSeatReservationArgs', changeSeatReservationArgs);
        this.data.seatReservationAuthorization =
            await this.sasaki.transaction.placeOrder.changeSeatReservationOffers({
                id: this.data.tmpSeatReservationAuthorization.id,
                object: {
                    event: {
                        id: this.data.screeningEvent.id
                    },
                    acceptedOffer: offers
                },
                purpose: {
                    id: this.data.transaction.id,
                    typeOf: this.data.transaction.typeOf
                }
            });
        if (this.data.seatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        if (this.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            await this.sasaki.payment.voidTransaction({
                id: this.data.creditCardAuthorization.id,
                object: {
                    typeOf: factory.chevre.paymentMethodType.CreditCard
                },
                purpose: {
                    id: this.data.transaction.id,
                    typeOf: this.data.transaction.typeOf
                }
            });
            this.data.creditCardAuthorization = undefined;
            this.save();
        }
        this.save();
    }

    /**
     * 購入者情報登録処理
     * @method customerContactRegistrationProcess
     */
    public async customerContactRegistrationProcess(customerContact: factory.transaction.placeOrder.ICustomerProfile) {
        if (this.data.transaction === undefined) {
            throw new Error('transaction is undefined');
        }
        await this.sasaki.getServices();
        // 入力情報を登録
        this.data.customerContact = await this.sasaki.transaction.placeOrder.setCustomerContact({
            id: this.data.transaction.id,
            object: { customerContact }
        });
        if (this.user.isNative() && !this.user.isMember()) {
            try {
                const updateRecordsArgs = {
                    datasetName: 'profile',
                    value: {
                        familyName: (customerContact.familyName === undefined) ? '' : convertToKatakana(customerContact.familyName),
                        givenName: (customerContact.givenName === undefined) ? '' : convertToKatakana(customerContact.givenName),
                        email: (customerContact.email === undefined) ? '' : customerContact.email,
                        telephone: (customerContact.telephone === undefined) ? '' : customerContact.telephone,
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
            await this.sasaki.payment.voidTransaction({
                id: this.data.creditCardAuthorization.id,
                object: {
                    typeOf: factory.chevre.paymentMethodType.CreditCard
                },
                purpose: {
                    id: this.data.transaction.id,
                    typeOf: this.data.transaction.typeOf
                }
            });
            this.data.creditCardAuthorization = undefined;
            this.save();
        }
        // クレジットカード登録
        const METHOD_LUMP: any = '1';
        this.data.creditCardAuthorization = await this.sasaki.payment.authorizeCreditCard({
            object: {
                typeOf: factory.paymentMethodType.CreditCard,
                // orderId: this.createOrderId(),
                method: METHOD_LUMP,
                creditCard: this.data.paymentCreditCard,
                amount: this.getTotalPrice()
            },
            purpose: {
                id: this.data.transaction.id,
                typeOf: this.data.transaction.typeOf
            }
        });
        this.save();
    }

    // /**
    //  * オーダーID生成
    //  * @method createOrderId
    //  */
    // private createOrderId() {
    //     if (this.data.seatReservationAuthorization === undefined
    //         || this.data.seatReservationAuthorization.result === undefined
    //         || this.data.screeningEvent === undefined) {
    //         throw new Error('status is different');
    //     }
    //     const DIGITS = {
    //         '02': -2,
    //         '08': -8
    //     };
    //     const orderCount = `00${this.data.orderCount}`.slice(DIGITS['02']);
    //     const tmpReserveNum =
    //         `00000000${this.data.seatReservationAuthorization.result.updTmpReserveSeatResult.tmpReserveNum}`.slice(DIGITS['08']);
    //     const theaterCode = this.data.screeningEvent.coaInfo.theaterCode;
    //     const reserveDate = moment().format('YYYYMMDD');
    //     this.data.orderCount += 1;
    //     // オーダーID 予約日 + 劇場ID(3桁) + 予約番号(8桁) + オーソリカウント(2桁)
    //     return `${reserveDate}${theaterCode}${tmpReserveNum}${orderCount}`;
    // }

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
            purpose: {
                id: this.data.transaction.id,
                typeOf: this.data.transaction.typeOf
            },
            object: {
                amount: Incentive.WatchingMovies,
                toAccountNumber: this.user.data.account.typeOfGood.accountNumber,
                notes: '鑑賞'
            }
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
        for (const offer of this.data.seatReservationAuthorization.object.acceptedOffer) {
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

        await this.sasaki.payment.authorizeAccount({
            object: {
                typeOf: factory.paymentMethodType.Account,
                amount: usePoint,
                fromAccount: this.user.data.account.typeOfGood,
                notes
            },
            purpose: {
                id: this.data.transaction.id,
                typeOf: this.data.transaction.typeOf
            }
        });
    }

    /**
     * 購入登録処理
     */
    public async purchaseRegistrationProcess() {
        const transaction = this.data.transaction;
        const screeningEvent = this.data.screeningEvent;
        const seller = this.data.seller;
        const seatReservationAuthorization = this.data.seatReservationAuthorization;
        const customerContact = this.data.customerContact;
        const userName = this.sasaki.userName;
        if (transaction === undefined
            || screeningEvent === undefined
            || seller === undefined
            || seatReservationAuthorization === undefined
            || customerContact === undefined) {
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
                this.data.mvtkAuthorization =
                    await this.sasaki.transaction.placeOrder.createMvtkAuthorization({
                        purpose: {
                            id: transaction.id,
                            typeOf: transaction.typeOf
                        },
                        object: {
                            typeOf: factory.action.authorize.discount.mvtk.ObjectType.Mvtk,
                            price: this.getMvtkTotalPrice(),
                            seatInfoSyncIn: this.getMvtkSeatInfoSync()
                        }
                    });
            }
            // 取引確定
            order = await this.sasaki.transaction.placeOrder.confirm({
                id: transaction.id,
                options: {
                    sendEmailMessage: true,
                    email: {
                        sender: {
                            email: 'noreply@ticket-cinemasunshine.com'
                        },
                        template: (this.user.isMember())
                        ? getPurchaseCompletionAppEmail({ seller, screeningEvent, customerContact, seatReservationAuthorization, userName })
                        : getPurchaseCompletionEmail({ seller, screeningEvent, customerContact, seatReservationAuthorization })
                    }
                }
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
            seller: this.data.seller,
            incentive: this.data.incentive
        };
        this.storage.save('complete', complete, SaveType.Session);

        try {
            // Google Analytics
            const sendData = {
                hitType: 'event',
                eventCategory: 'purchase',
                eventAction: 'complete',
                eventLabel: `conversion-${screeningEvent.superEvent.location.branchCode}`
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
                    if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
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
        if (this.user.isNative()) {
            try {
                const itemOffered = order.acceptedOffers[0].itemOffered;
                if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                    throw new Error('itemOffered.typeOf is not EventReservation');
                }
                const reservationFor = itemOffered.reservationFor;
                const localNotificationArgs = {
                    id: Number(order.orderNumber.replace(/\-/g, '')), // ID
                    title: '鑑賞時間が近づいています。', // タイトル
                    text: '劇場 / スクリーン: ' + reservationFor.superEvent.location.name.ja + '/' + reservationFor.location.name.ja + '\n' +
                        '作品名: ' + reservationFor.name.ja + '\n' +
                        '上映開始: ' + moment(reservationFor.startDate).format('YYYY/MM/DD HH:mm'), // テキスト
                    trigger: {
                        at: moment(reservationFor.startDate).subtract(30, 'minutes').toISOString() // 通知を送る時間（ISO）
                    },
                    foreground: true // 前面表示（デフォルトは前面表示しない）
                };
                this.callNative.localNotification(localNotificationArgs);
            } catch (err) {
                console.error(err);
            }
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
        if (this.data.screeningEvent === undefined
            || this.data.screeningEvent.coaInfo === undefined) {
            throw new Error('status is different');
        }
        await this.sasaki.getServices();
        const DIGITS = -2;
        const coaInfo = this.data.screeningEvent.coaInfo;
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
