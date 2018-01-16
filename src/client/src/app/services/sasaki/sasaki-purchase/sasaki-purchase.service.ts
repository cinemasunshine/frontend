import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SasakiPurchaseService {
    static ENDPOINT = `${environment.API_ENDPOINT}/api/purchase`;

    constructor(private http: HttpClient) { }

    /**
     * クレジット取消
     * @param {IcancelCreditCardAuthorizationArgs} args
     */
    public cancelCreditCardAuthorization(
        args: IcancelCreditCardAuthorizationArgs
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelCreditCardAuthorization`;
        return this.http.post<void>(url, {
            params: args
        }).toPromise();
    }

    /**
     * ムビチケ取消
     * @param {IcancelMvtkAuthorizationArgs} args
     */
    public cancelMvtkAuthorization(
        args: IcancelMvtkAuthorizationArgs
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelMvtkAuthorization`;
        return this.http.post<void>(url, {
            params: args
        }).toPromise();
    }

    /**
     * 座席取消
     * @param {IcancelSeatReservationArgs} args
     */
    public cancelSeatReservation(
        args: IcancelSeatReservationArgs
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/cancelSeatReservation`;
        return this.http.post<void>(url, {
            params: args
        }).toPromise();
    }

    /**
     * クレジット登録
     * @param {IcreateCreditCardAuthorizationArgs} args
     */
    public createCreditCardAuthorization(
        args: IcreateCreditCardAuthorizationArgs
    ) {
        const url = `${SasakiPurchaseService.ENDPOINT}/createCreditCardAuthorization`;
        return this.http.post<IAuthorizeAction>(url, {
            params: args
        }).toPromise();
    }

}

type ICreditCard = sasaki.factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw
    | sasaki.factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized
    | sasaki.factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

interface IAuthorizeAction {
    id: string;
}

interface IcancelCreditCardAuthorizationArgs {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

interface IcancelMvtkAuthorizationArgs {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

interface IcancelSeatReservationArgs {
    /**
     * 取引ID
     */
    transactionId: string;
    /**
     * アクションID
     */
    actionId: string;
}

interface IcreateCreditCardAuthorizationArgs {
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