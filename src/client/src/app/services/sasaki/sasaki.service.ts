import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as mvtkReserve from '@motionpicture/mvtk-reserve-service';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { FlgMember } from '@motionpicture/coa-service/lib/services/reserve';

@Injectable()
export class SasakiService {
    public auth: sasaki.IImplicitGrantClient;
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
        private http: HttpClient,
        private user: UserService
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
        if (this.auth === undefined
            || this.auth.credentials === undefined
            || this.expired < moment().unix()) {
            await this.authorize();
        }
        return {
            endpoint: environment.SASAKI_API_ENDPOINT,
            auth: this.auth
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const member = this.user.data.member;
        const url = '/api/authorize/getCredentials';
        const options = {
            params: new HttpParams().set('member', member)
        };
        let credentials;
        if (member === FlgMember.Member) {
            credentials = {
                accessToken: this.user.data.accessToken
            };
        } else {
            credentials = await this.http.get<any>(url, options).toPromise();
        }
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
        this.auth = sasaki.createAuthInstance(option);
        this.auth.setCredentials(credentials);
        const expired = 15;
        this.expired = moment().add(expired, 'minutes').unix();
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

}
