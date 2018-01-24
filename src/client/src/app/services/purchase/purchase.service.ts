import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as moment from 'moment';
import { TimeFormatPipe } from '../../pipes/time-format/time-format.pipe';
import { SasakiPurchaseService } from '../sasaki/sasaki-purchase/sasaki-purchase.service';
import { SaveType, StorageService } from '../storage/storage.service';
export type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;
export type ICustomerContact = sasaki.factory.transaction.placeOrder.ICustomerContact;
@Injectable()
export class PurchaseService {

    public data: Idata;

    constructor(
        private storage: StorageService,
        private sasakiPurchase: SasakiPurchaseService,
    ) {
        this.load();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: Idata | null = this.storage.load('purchase', SaveType.Local);
        if (data === null) {
            this.data = {
                orderCount: 0
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
        this.storage.save('purchase', this.data, SaveType.Local);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {
        this.data = {
            orderCount: 0
        };
        this.save();
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
    public getTheaterName() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;

        return individualScreeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;

        return individualScreeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;

        return individualScreeningEvent.workPerformed.name;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;
        moment.locale('ja');

        return moment(individualScreeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            individualScreeningEvent.coaInfo.dateJouei,
            individualScreeningEvent.startDate
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        const individualScreeningEvent = <IIndividualScreeningEvent>this.data.individualScreeningEvent;
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            individualScreeningEvent.coaInfo.dateJouei,
            individualScreeningEvent.endDate
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
     * 座席登録処理
     * @method seatRegistrationProcess
     */
    public async seatRegistrationProcess(offers: sasaki.factory.offer.seatReservation.IOffer[]) {
        if (this.data.transaction === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        // 予約中なら座席削除
        if (this.data.tmpSeatReservationAuthorization !== undefined) {
            const cancelSeatReservationArgs = {
                transactionId: this.data.transaction.id,
                actionId: this.data.tmpSeatReservationAuthorization.id
            };
            await this.sasakiPurchase.cancelSeatReservation(cancelSeatReservationArgs);
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
            await this.sasakiPurchase.createSeatReservation(createSeatReservationAuthorizationArgs);
        this.data.orderCount = 0;
        this.data.seatReservationAuthorization = undefined;
        this.save();
    }

    /**
     * 券種登録処理
     * @method ticketRegistrationProcess
     */
    public async ticketRegistrationProcess(offers: sasaki.factory.offer.seatReservation.IOffer[]) {
        if (this.data.transaction === undefined
            || this.data.tmpSeatReservationAuthorization === undefined
            || this.data.individualScreeningEvent === undefined) {
            throw new Error('status is different');
        }
        const changeSeatReservationArgs = {
            transactionId: this.data.transaction.id,
            actionId: this.data.tmpSeatReservationAuthorization.id,
            eventIdentifier: this.data.individualScreeningEvent.identifier,
            offers: offers
        };
        this.data.seatReservationAuthorization =
            await this.sasakiPurchase.changeSeatReservation(changeSeatReservationArgs);
        this.save();
    }

    /**
     * 購入者情報登録処理
     * @method customerContactRegistrationProcess
     */
    public async customerContactRegistrationProcess(args: {
        transactionId: string;
        contact: sasaki.factory.transaction.placeOrder.ICustomerContact;
    }) {
        // 入力情報を登録
        this.data.customerContact = await this.sasakiPurchase.setCustomerContact(args);
        this.save();
    }

    /**
     * クレジットカード支払い処理
     */
    public async creditCardPaymentProcess(token: string) {
        if (this.data.transaction === undefined) {
            throw new Error('status is different');
        }
        if (this.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            const cancelCreditCardAuthorizationArgs = {
                transactionId: this.data.transaction.id,
                actionId: this.data.creditCardAuthorization.id
            };
            await this.sasakiPurchase.cancelCreditCardAuthorization(cancelCreditCardAuthorizationArgs);
            this.data.creditCardAuthorization = undefined;
            this.save();
        }
        // クレジットカード登録
        const creditCard = {
            token: token
        };
        const METHOD_LUMP = '1';
        const createCreditCardAuthorizationArgs = {
            transactionId: this.data.transaction.id,
            orderId: this.createOrderId(),
            amount: this.getTotalPrice(),
            method: METHOD_LUMP,
            creditCard: creditCard
        };
        this.data.creditCardAuthorization =
            await this.sasakiPurchase.createCreditCardAuthorization(createCreditCardAuthorizationArgs);
        this.data.orderCount += 1;
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
        const DIGITS = -2;
        const orderCount = `00${this.data.orderCount}`.slice(DIGITS);
        const tmpReserveNum = this.data.seatReservationAuthorization.result.updTmpReserveSeatResult.tmpReserveNum;
        const theaterCode = this.data.individualScreeningEvent.coaInfo.theaterCode;
        const reserveDate = moment().format('YYYYMMDD');
        // オーダーID 予約日 + 劇場ID(3桁) + 予約番号(8桁) + オーソリカウント(2桁)
        return `${reserveDate}${theaterCode}${tmpReserveNum}${orderCount}`;
    }

    /**
     * 購入登録処理
     */
    public async purchaseRegistrationProcess() {
        if (this.data.transaction === undefined) {
            throw new Error('status is different');
        }
        // TODO
        // ムビチケ使用

        // 取引確定
        const order = await this.sasakiPurchase.transactionConfirm({
            transactionId: this.data.transaction.id
        });
        this.storage.save('order', order, SaveType.Session);
        // Cognitoへ登録

        // 購入情報削除
        this.reset();
    }
}



interface Idata {
    /**
     * 取引
     */
    transaction?: sasaki.factory.transaction.placeOrder.ITransaction;
    /**
     * 上映イベント
     */
    individualScreeningEvent?: IIndividualScreeningEvent;
    /**
     * 劇場ショップ
     */
    movieTheaterOrganization?: sasaki.factory.organization.movieTheater.IPublicFields;
    /**
     * 販売可能チケット情報
     */
    salesTickets?: ISalesTicket[];
    /**
     * 予約座席
     */
    seatReservationAuthorization?: sasaki.factory.action.authorize.seatReservation.IAction;
    /**
     * 予約座席(仮)
     */
    tmpSeatReservationAuthorization?: sasaki.factory.action.authorize.seatReservation.IAction;
    /**
     * オーダー回数
     */
    orderCount: number;
    /**
     * GMOトークンオブジェクト
     */
    gmoTokenObject?: IGmoTokenObject;
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
}

export interface ISalesTicket extends COA.services.reserve.ISalesTicketResult {
    glasses: boolean;
    mvtkNum: string;
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}
