import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SasakiPurchaseService {
    static ENDPOINT = `${environment.API_ENDPOINT}/api/purchase`;

    constructor(private http: HttpClient) { }

    /**
     * クレジット取消
     * @param {IcancelCreditCardAuthorizationIn} args
     */
    public cancelCreditCardAuthorization(
        args: IcancelCreditCardAuthorizationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelCreditCardAuthorization`;
        return this.http.post<void>(url, args).toPromise();
    }

    /**
     * ムビチケ取消
     * @param {IcancelMvtkAuthorizationIn} args
     */
    public cancelMvtkAuthorization(
        args: IcancelMvtkAuthorizationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelMvtkAuthorization`;
        return this.http.post<void>(url, args).toPromise();
    }

    /**
     * 座席取消
     * @param {IcancelSeatReservationIn} args
     */
    public cancelSeatReservation(
        args: IcancelSeatReservationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelSeatReservation`;
        return this.http.post<void>(url, args).toPromise();
    }

    /**
     * クレジット登録
     * @param {IcreateCreditCardAuthorizationIn} args
     */
    public createCreditCardAuthorization(
        args: IcreateCreditCardAuthorizationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/createCreditCardAuthorization`;
        return this.http.post<IAuthorizeAction>(url, args).toPromise();
    }

    /**
     * ムビチケ登録
     * @param {IcreateMvtkAuthorizationIn} args
     */
    public createMvtkAuthorization(
        args: IcreateMvtkAuthorizationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/createMvtkAuthorization`;
        return this.http.post<IAuthorizeAction>(url, args).toPromise();
    }

    /**
     * 座席登録
     * @param {IcreateSeatReservationIn} args
     */
    public createSeatReservation(
        args: IcreateSeatReservationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/createSeatReservation`;
        return this.http.post<sasaki.factory.action.authorize.seatReservation.IAction>(url, args).toPromise();
    }

    /**
     * 座席更新
     * @param {IchangeSeatReservationIn} args
     */
    public changeSeatReservation(
        args: IchangeSeatReservationIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/changeSeatReservation`;
        return this.http.post<sasaki.factory.action.authorize.seatReservation.IAction>(url, args).toPromise();
    }

    /**
     * 座席ステータス取得
     * @param {COA.services.reserve.IStateReserveSeatArgs} args
     */
    public getSeatState(
        args: COA.services.reserve.IStateReserveSeatArgs
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/getSeatState`;
        return this.http.get<COA.services.reserve.IStateReserveSeatResult>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * ムビチケ照会
     * @param {mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn} args
     */
    public mvtkPurchaseNumberAuth(
        args: mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/mvtkPurchaseNumberAuth`;
        return this.http.get<mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthResult>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * ムビチケ座席指定情報連携
     * @param {mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn} args
     */
    public mvtksSatInfoSync(
        args: mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/mvtksSatInfoSync`;
        return this.http.get<mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncResult>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * 購入情報登録
     * @param {IsetCustomerContactIn} args
     */
    public setCustomerContact(
        args: IsetCustomerContactIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/setCustomerContact`;
        return this.http.post<sasaki.factory.transaction.placeOrder.ICustomerContact>(url, args).toPromise();
    }

    /**
     * 取引確定
     * @param {ItransactionConfirmIn} args
     */
    public transactionConfirm(
        args: ItransactionConfirmIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/transactionConfirm`;
        return this.http.post<sasaki.factory.order.IOrder>(url, args).toPromise();
    }

    /**
     * 取引開始
     * @param {ItransactionStartIn} args
     */
    public transactionStart(
        args: ItransactionStartIn
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/transactionStart`;
        return this.http.post<sasaki.factory.transaction.placeOrder.ITransaction>(url, args).toPromise();
    }

}

type ICreditCard = sasaki.factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw
    | sasaki.factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized
    | sasaki.factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

export interface IAuthorizeAction {
    id: string;
}

export interface IcancelCreditCardAuthorizationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

export interface IcancelMvtkAuthorizationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

export interface IcancelSeatReservationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

export interface IcreateCreditCardAuthorizationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * オーダーID
     */
    orderId: string;
    /**
     * 金額
     */
    amount: number;
    /**
     * 支払い方法
     */
    method: string;
    /**
     * クレジットカード情報
     */
    creditCard: ICreditCard;
}

export interface IcreateMvtkAuthorizationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * ムビチケ情報
     */
    mvtk: sasaki.factory.action.authorize.mvtk.IObject;
}

export interface IcreateSeatReservationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * イベント識別子
     */
    eventIdentifier: string;
    /**
     * 座席販売情報
     */
    offers: sasaki.factory.offer.seatReservation.IOffer[];
}

export interface IchangeSeatReservationIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
    /**
     * イベント識別子
     */
    eventIdentifier: string;
    /**
     * 座席販売情報
     */
    offers: sasaki.factory.offer.seatReservation.IOffer[];
}

export interface IsetCustomerContactIn {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * customer contact info
     */
    contact: sasaki.factory.transaction.placeOrder.ICustomerContact;
}

export interface ItransactionConfirmIn {
    /**
     * 取引ID
     */
    transactionId: string;
}

export interface ItransactionStartIn {
    /**
     * 取引期限
     * 指定した日時を過ぎると、取引を進行することはできなくなります。
     */
    expires: Date;
    /**
     * 販売者ID
     */
    sellerId: string;
    /**
     * WAITER許可証トークン
     * 指定しなければ、バックエンドで許可証を発行しにいく
     */
    passportToken?: string;
}

export type IOrder = sasaki.factory.order.IOrder;
