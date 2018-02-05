import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Injectable()
export class SasakiService {
    public oauth2Client: sasaki.IImplicitGrantClient;

    constructor (private http: HttpClient) {}

    /**
     * @method createOption
     */
    public createOption() {
        return {
            endpoint: environment.API_ENDPOINT,
            auth: this.oauth2Client
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const url = `${environment.API_ENDPOINT}/api/authorize`;
        const result = await this.http.get<any>(url, {}).toPromise();
        this.oauth2Client.setCredentials(result);
    }

}
