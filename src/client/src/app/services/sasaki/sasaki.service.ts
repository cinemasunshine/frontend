import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
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

    constructor(private http: HttpClient) {

    }

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
        if (this.oauth2Client === undefined || this.oauth2Client.credentials === undefined) {
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
            domain: environment.AUTHORIZE_SERVER_DOMAIN,
            clientId: '',
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: [
                `${environment.RESOURCE_SERVER_URL}/transactions`,
                `${environment.RESOURCE_SERVER_URL}/events.read-only`,
                `${environment.RESOURCE_SERVER_URL}/organizations.read-only`,
                `${environment.RESOURCE_SERVER_URL}/orders.read-only`,
                `${environment.RESOURCE_SERVER_URL}/places.read-only`
            ].join(','),
            state: '',
            nonce: null,
            tokenIssuer: environment.TOKEN_ISSUER
        };
        this.oauth2Client = sasaki.createAuthInstance(option);
        this.oauth2Client.setCredentials(credentials);
    }

}
