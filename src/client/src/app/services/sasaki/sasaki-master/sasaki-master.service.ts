import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SasakiMasterService {
    static ENDPOINT = `${environment.API_ENDPOINT}/api/master`;

    constructor(private http: HttpClient) { }

    public getEvent(
        args: { identifier: string; }
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getEvent`;
        return this.http.get<sasaki.factory.event.individualScreeningEvent.IEventWithOffer>(url, {
            params: args
        }).toPromise();
    }

    public getSalesTickets(
        args: COA.services.reserve.ISalesTicketArgs
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getSalesTickets`;
        return this.http.get<COA.services.reserve.ISalesTicketResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

    public getSchedules(
        args: sasaki.factory.event.individualScreeningEvent.ISearchConditions
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getSchedules`;
        return this.http.get<sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]>(url, {
            params: <any>args
        }).toPromise();
    }

    public getTheaters() {
        const url = `${SasakiMasterService.ENDPOINT}/getTheaters`;
        return this.http.get<sasaki.factory.organization.movieTheater.IPublicFields[]>(url).toPromise();
    }

}
