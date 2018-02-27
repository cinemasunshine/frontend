import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Injectable()
export class SasakiService {
    public oauth2Client: sasaki.IImplicitGrantClient;
    public event: sasaki.service.Event;
    public order: sasaki.service.Order;
    public organization: sasaki.service.Organization;
    public person: sasaki.service.Person;
    public place: sasaki.service.Place;
    public transaction: {
        placeOrder: sasaki.service.transaction.PlaceOrder
    };
    private expired: number;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new sasaki.service.Event(option);
            this.order = new sasaki.service.Order(option);
            this.organization = new sasaki.service.Organization(option);
            this.person = new sasaki.service.Person(option);
            this.place = new sasaki.service.Place(option);
            this.transaction = {
                placeOrder: new sasaki.service.transaction.PlaceOrder(option)
            };
        } catch (err) {
            console.log(err);
            throw new Error('getServices is failed');
        }
    }

    /**
     * @method createOption
     */
    public async createOption() {
        if (this.oauth2Client === undefined
            || this.oauth2Client.credentials === undefined
            || this.expired < moment().unix()) {
            await this.authorize();
        }
        return {
            endpoint: environment.SASAKI_API_ENDPOINT,
            auth: this.oauth2Client
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const url = `${environment.API_ENDPOINT}/api/authorize/getCredentials`;
        const credentials = await this.http.get<any>(url, {}).toPromise();
        const option = {
            domain: '',
            clientId: '',
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.oauth2Client = sasaki.createAuthInstance(option);
        this.oauth2Client.setCredentials(credentials);
        const expired = 15;
        this.expired = moment().add(expired, 'minutes').unix();
    }

    /**
     * ムビチケ照会
     * @param {mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn} args
     */
    public mvtkPurchaseNumberAuth(
        args: mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthIn
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtkPurchaseNumberAuth`;
        return this.http.post<mvtkReserve.services.auth.purchaseNumberAuth.IPurchaseNumberAuthResult>(url, args).toPromise();
    }

    /**
     * ムビチケ座席指定情報連携
     * @param {mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn} args
     */
    public mvtksSatInfoSync(
        args: mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncIn
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtksSatInfoSync`;
        return this.http.post<mvtkReserve.services.seat.seatInfoSync.ISeatInfoSyncResult>(url, args).toPromise();
    }

    /**
     * 座席ステータス取得
     * @param {COA.services.reserve.IStateReserveSeatArgs} args
     */
    public getSeatState(
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
    public mvtkTicketcode(
        args: COA.services.master.IMvtkTicketcodeArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/purchase/mvtkTicketcode`;
        return this.http.post<COA.services.master.IMvtkTicketcodeResult>(url, args).toPromise();
    }

    /**
     * 券種取得
     * @method getSalesTickets
     * @param {COA.services.reserve.ISalesTicketArgs} args
     */
    public getSalesTickets(
        args: COA.services.reserve.ISalesTicketArgs
    ) {
        const url = `${environment.API_ENDPOINT}/api/master/getSalesTickets`;
        return this.http.get<COA.services.reserve.ISalesTicketResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

}
