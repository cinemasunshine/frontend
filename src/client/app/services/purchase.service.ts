import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import {
    convertToKatakana,
    createMovieTicketsFromAuthorizeSeatReservation,
    formatTelephone,
    getPurchaseCompletionEmail,
    getPurchaseCompletionMemberEmail,
    schedule2Performance
} from '../functions';
import { ISchedule } from '../models';
import { TimeFormatPipe } from '../modules/shared/pipes';
import { AwsCognitoService } from './aws-cognito.service';
import { CallNativeService } from './call-native.service';
import { CinerinoService } from './cinerino.service';
import { SaveType, StorageService } from './storage.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';

declare const ga: Function;

export type ISalesTicketResult = COA.factory.reserve.ISalesTicketResult;
type IUnauthorizedCardOfMember = factory.chevre.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;
type IUncheckedCardTokenized = factory.chevre.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;

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
    seller?: factory.chevre.seller.ISeller;
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
    creditCardAuthorization?: { id: string; };
    /**
     * 購入者情報
     */
    customerContact?: factory.person.IProfile;
    /**
     * ムビチケ券種情報
     */
    mvtkTickets: IMovieTicket[];
    /**
     * ムビチケ使用情報
     */
    checkMovieTicketAction?: factory.action.check.paymentMethod.movieTicket.IAction;
    /**
     * MGチケット券種種情報
     */
    mgTickets: IMovieTicket[];
    /**
     * MGチケット使用情報
     */
    checkMgTicketAction?: factory.action.check.paymentMethod.movieTicket.IAction;
    /**
     * インセンティブ情報
     */
    pecorinoAwardAuthorization?: { id: string; };
    /**
     * インセンティブ
     */
    incentive: number;
    /**
     * ポイント券種情報
     */
    pointTickets: COA.factory.master.ITicketResult[];
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}

export interface IMovieTicket {
    knyknrNoInfo: mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberInfo;
    ykknInfo: mvtkReserve.services.auth.purchaseNumberAuth.IValidTicket;
    input?: {
        knyknrNo: string;
        pinCd: string;
    };
    ticketcodeResult: COA.factory.master.IMvtkTicketcodeResult;
}

/**
 * インセンティブ
 */
enum Incentive {
    WatchingMovies = 1
}

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    public data: IPurchaseData;
    public scheduleApiEndpoint?: string;

    constructor(
        private storage: StorageService,
        private cinerinoService: CinerinoService,
        private awsCognito: AwsCognitoService,
        private callNative: CallNativeService,
        private userService: UserService,
        private utilService: UtilService
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
                mgTickets: [],
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
            mgTickets: [],
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
    public async isSalse(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
        try {
            const now = (await this.utilService.getServerTime()).date;
            if (screeningEvent.coaInfo === undefined) {
                return new Error('イベントが情報が不足しています');
            }
            const branchCode = screeningEvent.coaInfo.theaterCode;
            const theatreTable =
                await this.utilService.getJson<{ code: string; name: string }[]>('/json/table/theaters.json');
            const prefix = (environment.production) ? '0' : '1';
            const theatreTableFindResult = theatreTable.find(t => branchCode === `${prefix}${t.code}`);
            if (theatreTableFindResult === undefined) {
                throw new Error('劇場が見つかりません');
            }
            if (this.scheduleApiEndpoint === undefined) {
                this.scheduleApiEndpoint = (await this.utilService.getJson<{
                    scheduleApiEndpoint: string
                }>(`/api/config?date${moment().toISOString()}`)).scheduleApiEndpoint;
            }
            const url = `${this.scheduleApiEndpoint}/${theatreTableFindResult.name}/schedule/json/schedule.json?date=${now}`;
            const schedules = await this.utilService.getJson<ISchedule[]>(url);
            const dateJouei = screeningEvent.coaInfo.dateJouei;
            const schedule = schedules.find(s => s.date === dateJouei);
            if (schedule === undefined) {
                throw new Error('スケジュールが見つかりません');
            }
            const performances = schedule2Performance(schedule, this.userService.isMember());
            const performance = performances.find(p => `${branchCode}${p.createId()}` === screeningEvent.id);
            if (performance === undefined) {
                throw new Error('パフォーマンスが見つかりません');
            }
            return performance.isSalse();
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.superEvent.location.name === undefined
            || screeningEvent.superEvent.location.name.ja === undefined) {
            return '';
        }

        return screeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.location.name === undefined
            || screeningEvent.location.name.ja === undefined) {
            return '';
        }

        return screeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.name.ja === undefined) {
            return '';
        }

        return screeningEvent.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate(): string {
        const screeningEvent = this.data.screeningEvent;
        if (screeningEvent === undefined
            || screeningEvent.coaInfo === undefined) {
            return '';
        }
        moment.locale('ja');

        return moment(screeningEvent.coaInfo.dateJouei).format('YYYY年MM月DD日(ddd)');
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
        this.data.seatReservationAuthorization.object.acceptedOffer.forEach((offer) => {
            const ticketInfo = <any>offer.ticketInfo;
            // const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
            const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
            result += (offer.ticketInfo.salePrice + spseatAdd2);
        });

        return result;
    }

    /**
     * 外部チケット合計金額計算
     * @method getTotalPrice
     */
    public getMovieTicketTotalPrice(params: {
        paymentMethodType: factory.chevre.paymentMethodType
    }): number {
        let result = 0;
        if (this.data.seatReservationAuthorization === undefined) {
            return result;
        }
        const paymentMethodType = params.paymentMethodType;
        this.data.seatReservationAuthorization.object.acceptedOffer.forEach((offer: any) => {
            if (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket) {
                result += offer.ticketInfo.mvtkSalesPrice;
            } else if (paymentMethodType === factory.chevre.paymentMethodType.MGTicket) {
                result += offer.ticketInfo.mvtkSalesPrice;
            }
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
     * 外部チケット対応作品判定
     * @method isUsedMovieTicket
     * @returns {boolean}
     */
    public isUsedMovieTicket(params: { paymentMethodType: factory.chevre.paymentMethodType }): boolean {
        if (this.data.screeningEvent === undefined) {
            return false;
        }
        const paymentMethodType = params.paymentMethodType;
        const today = moment().format('YYYYMMDD');
        const coaInfo = this.data.screeningEvent.superEvent.coaInfo;
        if (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket) {
            return (coaInfo !== undefined
                && coaInfo.flgMvtkUse === '1'
                && coaInfo.dateMvtkBegin !== undefined
                && Number(coaInfo.dateMvtkBegin) <= Number(today));
        }
        if (paymentMethodType === factory.chevre.paymentMethodType.MGTicket) {
            return (coaInfo !== undefined
                && coaInfo.flgMvtkUse === '1'
                && coaInfo.dateMvtkBegin !== undefined
                && Number(coaInfo.dateMvtkBegin) <= Number(today));
        }

        return false;
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
     * 外部チケットでの予約判定
     * @method isReserveMovieTicket
     * @returns {boolean}
     */
    public isReserveMovieTicket(params: { paymentMethodType: factory.chevre.paymentMethodType }): boolean {
        if (this.data.seatReservationAuthorization === undefined) {
            return false;
        }
        const paymentMethodType = params.paymentMethodType;
        const findResult = this.data.seatReservationAuthorization.object.acceptedOffer.find((offer: any) => {
            if (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket) {
                return (offer.ticketInfo.mvtkNum !== '');
            }
            if (paymentMethodType === factory.chevre.paymentMethodType.MGTicket) {
                return false;
            }
            return false;
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
        const pointTickets: COA.factory.master.ITicketResult[] = [];
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
     * 外部チケット着券情報取得
     * @method getMovieTicketSeatInfoSync
     */
    public getMovieTicketSeatInfoSync(params: {
        paymentMethodType: factory.chevre.paymentMethodType;
        deleteFlag?: string
        reservedDeviceType?: string
    }) {
        if (this.data.seatReservationAuthorization === undefined
            || this.data.seatReservationAuthorization.result === undefined
            || this.data.screeningEvent === undefined) {
            throw new Error('status is different');
        }
        const targetTickets = (params.paymentMethodType === factory.chevre.paymentMethodType.MovieTicket)
            ? this.data.mvtkTickets
            : this.data.mgTickets;
        const purchaseNoInfoList: mvtkReserve.services.seat.seatInfoSync.IKnyknrNoInfo[] = [];
        const seats: { zskCd: string; }[] = [];

        for (const offer of this.data.seatReservationAuthorization.object.acceptedOffer) {
            const findResult = targetTickets.find((t) => {
                return (t.knyknrNoInfo.knyknrNo === offer.ticketInfo.mvtkNum
                    && t.ticketcodeResult.ticketCode === offer.ticketInfo.ticketCode);
            });
            if (findResult === undefined || findResult.input === undefined) {
                continue;
            }
            const purchaseNoInfo = purchaseNoInfoList.find((info) => {
                return (info.knyknrNo === findResult.knyknrNoInfo.knyknrNo);
            });
            if (purchaseNoInfo !== undefined) {
                const knshInfo = purchaseNoInfo.knshInfo.find((info) => {
                    return (info.knshTyp === findResult.ykknInfo.ykknshTyp);
                });
                if (knshInfo !== undefined) {
                    knshInfo.miNum += 1;
                } else {
                    purchaseNoInfo.knshInfo.push({
                        knshTyp: findResult.ykknInfo.ykknshTyp,
                        miNum: 1
                    });
                }
            } else {
                purchaseNoInfoList.push({
                    knyknrNo: findResult.knyknrNoInfo.knyknrNo,
                    pinCd: findResult.input.pinCd,
                    knshInfo: [{
                        knshTyp: findResult.ykknInfo.ykknshTyp,
                        miNum: 1
                    }]
                });
            }
            seats.push({ zskCd: offer.seatNumber });
        }
        if (purchaseNoInfoList.length === 0 || seats.length === 0) {
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
        const deleteFlag = (params.deleteFlag === undefined) ? '' : params.deleteFlag;
        const reservedDeviceType = (params.reservedDeviceType === undefined) ? '02' : params.reservedDeviceType;
        const skhnCd = `${coaInfo.titleCode}${`00${coaInfo.titleBranchNum}`.slice(DIGITS)}`;

        return {
            kgygishCd: (params.paymentMethodType === factory.chevre.paymentMethodType.MovieTicket)
                ? environment.MVTK_COMPANY_CODE
                : environment.MG_COMPANY_CODE,
            yykDvcTyp: reservedDeviceType,
            trkshFlg: deleteFlag,
            kgygishSstmZskyykNo: systemReservationNumber,
            kgygishUsrZskyykNo: String(tmpReserveNum),
            jeiDt: `${day} ${time}`,
            kijYmd: day,
            stCd: siteCode,
            screnCd: coaInfo.screenCode,
            knyknrNoInfo: purchaseNoInfoList,
            zskInfo: seats,
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
        await this.cinerinoService.getServices();
        if (this.data.screeningEvent.superEvent.location === undefined
            || this.data.screeningEvent.superEvent.location.branchCode === undefined) {
            throw new Error('branchCode is undefined');
        }
        const branchCode = this.data.screeningEvent.superEvent.location.branchCode;
        // 販売者を検索
        const searchResult = await this.cinerinoService.seller.search({
            location: { branchCodes: [branchCode] }
        });
        this.data.seller = searchResult.data[0];
        if (this.data.seller.id === undefined) {
            throw new Error('seller.id is undefined');
        }
        this.save();
        await this.cinerinoService.getServices();
        const now = (await this.utilService.getServerTime()).date;
        // 取引期限
        const expires = moment(now).add(environment.TRANSACTION_TIME, 'minutes').toDate();
        // 取引開始
        this.data.transaction = await this.cinerinoService.transaction.placeOrder.start({
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
        await this.cinerinoService.getServices();
        await this.cinerinoService.transaction.placeOrder4sskts.cancelSeatReservationAuthorization({
            id: this.data.tmpSeatReservationAuthorization.id,
            purpose: this.data.tmpSeatReservationAuthorization.purpose
        });
        this.data.tmpSeatReservationAuthorization = undefined;
        this.save();
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
        await this.cinerinoService.getServices();
        // 予約中なら座席削除
        if (this.data.tmpSeatReservationAuthorization !== undefined) {
            await this.cinerinoService.transaction.placeOrder4sskts.cancelSeatReservationAuthorization({
                id: this.data.tmpSeatReservationAuthorization.id,
                purpose: this.data.tmpSeatReservationAuthorization.purpose
            });
            this.data.tmpSeatReservationAuthorization = undefined;
            this.save();
        }
        // 座席登録
        this.data.tmpSeatReservationAuthorization =
            await this.cinerinoService.transaction.placeOrder4sskts.createSeatReservationAuthorization({
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
        await this.cinerinoService.getServices();
        // console.log('changeSeatReservationArgs', changeSeatReservationArgs);
        this.data.seatReservationAuthorization =
            await this.cinerinoService.transaction.placeOrder4sskts.changeSeatReservationOffers({
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
            await this.cinerinoService.payment.voidTransaction({
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
        await this.cinerinoService.getServices();
        // 入力情報を登録
        await this.cinerinoService.transaction.placeOrder.setProfile({
            id: this.data.transaction.id,
            agent: {
                ...customerContact,
                telephone: formatTelephone((<string>customerContact.telephone), 'E.164')
            }
        });
        this.data.customerContact = customerContact;
        if (this.userService.isNative() && !this.userService.isMember()) {
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
        await this.cinerinoService.getServices();
        if (this.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            await this.cinerinoService.payment.voidTransaction({
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
        this.data.creditCardAuthorization = await this.cinerinoService.payment.authorizeCreditCard({
            object: {
                typeOf: factory.action.authorize.paymentMethod.any.ResultType.Payment,
                method: METHOD_LUMP,
                creditCard: this.data.paymentCreditCard,
                amount: this.getTotalPrice(),
                paymentMethod: factory.chevre.paymentMethodType.CreditCard
            },
            purpose: {
                id: this.data.transaction.id,
                typeOf: this.data.transaction.typeOf
            }
        });
        this.save();
    }

    /**
     * インセンティブ処理
     */
    public async incentiveProcess() {
        if (this.data.transaction === undefined
            || this.userService.data.account === undefined) {
            throw new Error('status is different');
        }
        await this.cinerinoService.getServices();
        this.data.pecorinoAwardAuthorization =
            await this.cinerinoService.transaction.placeOrder.authorizePointAward({
                purpose: {
                    id: this.data.transaction.id,
                    typeOf: this.data.transaction.typeOf
                },
                object: { notes: '鑑賞' }
            });
        this.data.incentive = Incentive.WatchingMovies;
    }

    /**
     * ポイント決済処理
     */
    public async pointPaymentProcess() {
        if (this.data.transaction === undefined
            || this.userService.data.account === undefined
            || this.data.seatReservationAuthorization === undefined) {
            throw new Error('status is different');
        }
        await this.cinerinoService.getServices();
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

        await this.cinerinoService.payment.authorizeAccount({
            object: {
                typeOf: factory.action.authorize.paymentMethod.any.ResultType.Payment,
                amount: usePoint,
                notes,
                paymentMethod: factory.chevre.paymentMethodType.Account
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
        const userName = this.cinerinoService.userName;
        if (transaction === undefined
            || screeningEvent === undefined
            || seller === undefined
            || seatReservationAuthorization === undefined
            || customerContact === undefined) {
            throw new Error('status is different');
        }
        await this.cinerinoService.getServices();
        let order: factory.order.IOrder;
        if (this.isReserveMovieTicket({ paymentMethodType: factory.chevre.paymentMethodType.MovieTicket })
            && this.data.checkMovieTicketAction !== undefined) {
            // ムビチケ利用
            const checkMovieTicketAction = this.data.checkMovieTicketAction;
            const movieTickets = createMovieTicketsFromAuthorizeSeatReservation({
                authorizeSeatReservation: seatReservationAuthorization,
                seller,
                checkMovieTicketAction
            });
            const identifiers: string[] = [];
            movieTickets.forEach((m) => {
                const findResult = identifiers.find(i => i === m.identifier);
                if (findResult !== undefined) {
                    return;
                }
                identifiers.push(m.identifier);
            });
            for (const identifier of identifiers) {
                const movieTicketIdentifier = movieTickets.filter(m => m.identifier === identifier);
                await this.cinerinoService.payment.authorizeMovieTicket({
                    object: {
                        typeOf: factory.action.authorize.paymentMethod.any.ResultType.Payment,
                        amount: 0,
                        movieTickets: movieTicketIdentifier,
                        paymentMethod: movieTicketIdentifier[0].typeOf
                    },
                    purpose: transaction
                });
            }
        }
        // 取引確定
        const confirmResult = await this.cinerinoService.transaction.placeOrder4sskts.confirm({
            id: transaction.id,
            sendEmailMessage: true,
            email: {
                sender: { email: 'noreply@ticket-cinemasunshine.com' },
                template: (this.userService.isMember())
                    ? getPurchaseCompletionMemberEmail({
                        seller, screeningEvent, customerContact, seatReservationAuthorization, userName
                    })
                    : getPurchaseCompletionEmail({ seller, screeningEvent, customerContact, seatReservationAuthorization })
            }
        });
        order = confirmResult.order;

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

        if (this.userService.isNative() && !this.userService.isMember()) {
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
                    if (recordOrder.acceptedOffers[0].itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                        return;
                    }
                    const itemOffered = <factory.chevre.reservation.IReservation<
                        factory.chevre.reservationType.EventReservation
                    >>recordOrder.acceptedOffers[0].itemOffered;
                    const endDate = moment(itemOffered.reservationFor.endDate).unix();
                    const limitDate = moment().add(-1, 'month').unix();
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
        if (this.userService.isNative()) {
            try {
                if (order.acceptedOffers[0].itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
                    throw new Error('itemOffered.typeOf is not EventReservation');
                }
                const itemOffered = <factory.chevre.reservation.IReservation<
                    factory.chevre.reservationType.EventReservation
                >>order.acceptedOffers[0].itemOffered;
                const reservationFor = itemOffered.reservationFor;
                const theaterName = (reservationFor.superEvent.location.name === undefined
                    || reservationFor.superEvent.location.name.ja === undefined)
                    ? '' : reservationFor.superEvent.location.name.ja;
                const screenName = (reservationFor.location.name === undefined
                    || reservationFor.location.name.ja === undefined)
                    ? '' : reservationFor.location.name.ja;
                const localNotificationArgs = {
                    id: Number(order.orderNumber.replace(/\-/g, '')), // ID
                    title: '鑑賞時間が近づいています。', // タイトル
                    text: `劇場 / スクリーン: ${theaterName}/${screenName}
                    作品名: ${reservationFor.name.ja}
                    上映開始: ${moment(reservationFor.startDate).format('YYYY/MM/DD HH:mm')}`, // テキスト
                    trigger: {
                        at: moment(reservationFor.startDate).add(-30, 'minutes').toISOString() // 通知を送る時間（ISO）
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
     * 外部チケット認証処理
     */
    public async movieTicketAuthenticationProcess(params: {
        paymentMethodType: factory.chevre.paymentMethodType;
        inputDataList: {
            knyknrNo: string;
            pinCd: string;
        }[];
    }) {
        const paymentMethodType = params.paymentMethodType;
        const inputDataList = params.inputDataList;
        const transaction = this.data.transaction;
        const seller = this.data.seller;
        const screeningEvent = this.data.screeningEvent;
        if (transaction === undefined
            || seller === undefined
            || seller.id === undefined
            || screeningEvent === undefined
            || screeningEvent.coaInfo === undefined) {
            throw new Error('status is different');
        }
        await this.cinerinoService.getServices();
        const coaInfo = screeningEvent.coaInfo;
        const movieTickets = inputDataList.map((i) => {
            return {
                typeOf: paymentMethodType,
                project: seller.project,
                identifier: i.knyknrNo, // 購入管理番号
                accessCode: i.pinCd // PINコード
            };
        });
        const checkMovieTicketAction = await this.cinerinoService.payment.checkMovieTicket({
            typeOf: paymentMethodType,
            movieTickets: movieTickets.map((movieTicket) => {
                return {
                    ...movieTicket,
                    serviceType: '', // 情報空でよし
                    serviceOutput: {
                        reservationFor: {
                            typeOf: screeningEvent.typeOf,
                            id: screeningEvent.id
                        },
                        reservedTicket: {
                            ticketedSeat: {
                                typeOf: factory.chevre.placeType.Seat,
                                seatingType: <any>'', // 情報空でよし
                                seatNumber: '', // 情報空でよし
                                seatRow: '', // 情報空でよし
                                seatSection: '' // 情報空でよし
                            }
                        }
                    }
                };
            }),
            seller: {
                typeOf: seller.typeOf,
                id: seller.id
            }
        });
        if (checkMovieTicketAction.result === undefined) {
            throw new Error('checkMovieTicketAction error');
        }
        const success = 'N000';
        const purchaseNumberAuthResult = checkMovieTicketAction.result.purchaseNumberAuthResult;
        if (purchaseNumberAuthResult.resultInfo.status !== success
            || purchaseNumberAuthResult.ykknmiNumSum === null
            || purchaseNumberAuthResult.ykknmiNumSum === 0
            || purchaseNumberAuthResult.knyknrNoInfoOut === null) {
            throw new Error('purchaseNumberAuth error');
        }
        const results = [];
        for (const knyknrNoInfo of purchaseNumberAuthResult.knyknrNoInfoOut) {
            if (knyknrNoInfo.ykknInfo === null) {
                continue;
            }
            for (const ykknInfo of knyknrNoInfo.ykknInfo) {
                const ticketcodeParams = {
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
                const ticketcodeResult = await this.cinerinoService.mvtkTicketcode(ticketcodeParams);
                const data = {
                    ticketcodeResult,
                    knyknrNoInfo,
                    ykknInfo,
                    input: inputDataList.find(d => d.knyknrNo === knyknrNoInfo.knyknrNo)
                };
                results.push(data);
            }
        }
        if (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket) {
            this.data.mvtkTickets = results;
            this.data.checkMovieTicketAction = checkMovieTicketAction;
        }
        if (paymentMethodType === factory.chevre.paymentMethodType.MGTicket) {
            this.data.mgTickets = results;
            this.data.checkMgTicketAction = checkMovieTicketAction;
        }
        this.save();
    }
}
