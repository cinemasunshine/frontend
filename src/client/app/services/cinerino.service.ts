import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@cinerino/api-javascript-client';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { IPurchaseData } from './purchase.service';
import { SaveType, StorageService } from './storage.service';
import { IUserData } from './user.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class CinerinoService {
    public auth: cinerino.IImplicitGrantClient;
    public event: cinerino.service.Event;
    public order: cinerino.service.Order;
    public seller: cinerino.service.Seller;
    public person: cinerino.service.Person;
    public payment: cinerino.service.Payment;
    public ownershipInfo: cinerino.service.person.OwnershipInfo;
    public transaction: {
        placeOrder: cinerino.service.transaction.PlaceOrder;
        placeOrder4sskts: cinerino.service.transaction.PlaceOrder4sskts;
    };
    private endpoint: string;
    public userName: string;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private utilservice: UtilService
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new cinerino.service.Event(option);
            this.order = new cinerino.service.Order(option);
            this.seller = new cinerino.service.Seller(option);
            this.person = new cinerino.service.Person(option);
            this.payment = new cinerino.service.Payment(option);
            this.ownershipInfo = new cinerino.service.person.OwnershipInfo(option);
            this.transaction = {
                placeOrder: new cinerino.service.transaction.PlaceOrder(option),
                placeOrder4sskts: new cinerino.service.transaction.PlaceOrder4sskts(option)
            };
        } catch (err) {
            console.error(err);
            throw new Error('getServices is failed');
        }
    }

    /**
     * @method createOption
     */
    public async createOption() {
        await this.authorize();
        return {
            endpoint: this.endpoint,
            auth: this.auth
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        if (this.auth !== undefined && this.auth.credentials.expiryDate !== undefined) {
            const now = (await this.utilservice.getServerTime()).date;
            const expiryDate = this.auth.credentials.expiryDate;
            const isTokenExpired = (expiryDate !== undefined)
                ? (expiryDate <= (moment(now).add(-5, 'minute').toDate()).getTime()) : false;
            if (!isTokenExpired) {
                // アクセストークン取得・更新しない
                return;
            }
        }
        const user: IUserData | null = this.storage.load('user', SaveType.Session);
        const purchase: IPurchaseData | null = this.storage.load('purchase', SaveType.Session);
        const clientId = (user === null) ? undefined : user.clientId;
        const member = (user === null) ? undefined : user.memberType;
        const url = '/api/authorize/getCredentials';
        const branchCode = (purchase === null || purchase.seller === undefined || purchase.seller.location === undefined)
            ? undefined : purchase.seller.location.branchCode;
        const body = { clientId, member, branchCode };
        const result = await this.http.post<{
            credentials: { accessToken: string; expiryDate?: number; };
            clientId: string;
            endpoint: string;
            userName: string;
        }>(url, body).toPromise();

        const option = {
            domain: '',
            clientId: result.clientId,
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.auth = cinerino.createAuthInstance(option);
        this.auth.setCredentials(result.credentials);
        this.endpoint = result.endpoint;
        this.userName = result.userName;
    }

    /**
     * サインイン
     */
    public async signIn() {
        const url = '/api/authorize/signIn';
        const user = this.storage.load('user', SaveType.Session);
        const clientId = user.clientId;
        const body = { clientId };
        const result = await this.http.post<{ url: string; }>(url, body).toPromise();
        // console.log(result.url);
        location.href = result.url;
    }

    /**
     * ムビチケ照会
     * @param {mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn} args
     */
    public async mvtkPurchaseNumberAuth(
        args: mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtkPurchaseNumberAuth`;

        return this.http.post<mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthResult>(url, args).toPromise();
    }

    /**
     * ムビチケ座席指定情報連携
     * @param {mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn} args
     */
    public async mvtksSatInfoSync(
        args: mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtksSatInfoSync`;


        return this.http.post<mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncResult>(url, args).toPromise();
    }

    /**
     * 座席ステータス取得
     * @param {COA.services.reserve.IStateReserveSeatArgs} args
     */
    public async getSeatState(
        args: COA.services.reserve.IStateReserveSeatArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/getSeatState`;

        return this.http.get<COA.services.reserve.IStateReserveSeatResult>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * スクリーンマスタ取得
     * @param {COA.services.master.IScreenArgs} args
     */
    public async getScreens(
        args: COA.services.master.IScreenArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/master/getScreens`;

        return this.http.get<COA.services.master.IScreenResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * ムビチケチケットコード取得
     * @param {COA.services.master.IMvtkTicketcodeArgs} args
     */
    public async mvtkTicketcode(
        args: COA.services.master.IMvtkTicketcodeArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtkTicketcode`;
        const result = await this.http.post<COA.services.master.IMvtkTicketcodeResult>(url, args).toPromise();
        // 暫定的に対応
        if ((<any>result).name === 'COAServiceError') {
            throw new Error('COAServiceError');
        }

        return result;
    }

    /**
     * 券種取得
     * @method getSalesTickets
     * @param {COA.services.reserve.ISalesTicketArgs} args
     */
    public async getSalesTickets(
        args: COA.services.reserve.ISalesTicketArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/master/getSalesTickets`;
        return this.http.get<COA.services.reserve.ISalesTicketResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * 券種マスター一覧取得
     * @method getTickets
     * @param {COA.services.reserve.ITicketArgs} args
     */
    public async getTickets(
        args: COA.services.master.ITicketArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/master/getTickets`;
        return this.http.get<COA.services.master.ITicketResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

}
