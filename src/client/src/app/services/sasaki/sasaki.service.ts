import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { IPurchaseData } from '../purchase/purchase.service';
import { SaveType, StorageService } from '../storage/storage.service';
import { IUserData } from '../user/user.service';

@Injectable()
export class SasakiService {
    public auth: sasaki.IImplicitGrantClient;
    public event: sasaki.service.Event;
    public order: sasaki.service.Order;
    public seller: sasaki.service.Seller;
    public person: sasaki.service.Person;
    public payment: sasaki.service.Payment;
    public ownershipInfo: sasaki.service.person.OwnershipInfo;
    public transaction: {
        placeOrder: sasaki.service.transaction.PlaceOrder
    };
    private endpoint: string;
    public userName: string;

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new sasaki.service.Event(option);
            this.order = new sasaki.service.Order(option);
            this.seller = new sasaki.service.Seller(option);
            this.person = new sasaki.service.Person(option);
            this.payment = new sasaki.service.Payment(option);
            this.ownershipInfo = new sasaki.service.person.OwnershipInfo(option);
            this.transaction = {
                placeOrder: new sasaki.service.transaction.PlaceOrder(option)
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
        const user: IUserData | null = this.storage.load('user', SaveType.Session);
        const purchase: IPurchaseData | null = this.storage.load('purchase', SaveType.Session);
        const clientId = (user === null) ? undefined : user.clientId;
        const member = (user === null) ? undefined : user.memberType;
        const url = '/api/authorize/getCredentials';
        const branchCode = (purchase === null || purchase.seller === undefined || purchase.seller.location === undefined)
            ? undefined : purchase.seller.location.branchCode;
        const body = { clientId, member, branchCode };
        const result = await this.http.post<{
            credentials: { accessToken: string; };
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
        this.auth = sasaki.createAuthInstance(option);
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
