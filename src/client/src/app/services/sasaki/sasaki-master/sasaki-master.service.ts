import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as COA from '@motionpicture/coa-service';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SasakiMasterService {
    public static ENDPOINT = `${environment.API_ENDPOINT}/api/master`;

    constructor(private http: HttpClient) { }

    /**
     * イベント取得
     * @method getEvent
     * @param {{ identifier: string; }} args
     */
    public getEvent(
        args: { identifier: string; }
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getEvent`;
        return this.http.get<sasaki.factory.event.individualScreeningEvent.IEventWithOffer>(url, {
            params: args
        }).toPromise();
    }

    /**
     * 券種取得
     * @method getSalesTickets
     * @param {COA.services.reserve.ISalesTicketArgs} args
     */
    public getSalesTickets(
        args: COA.services.reserve.ISalesTicketArgs
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getSalesTickets`;
        return this.http.get<COA.services.reserve.ISalesTicketResult[]>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * スケジュール取得
     * @method getSchedules
     * @param {sasaki.factory.event.individualScreeningEvent.ISearchConditions} args
     */
    public getSchedules(
        args: sasaki.factory.event.individualScreeningEvent.ISearchConditions
    ) {
        const url = `${SasakiMasterService.ENDPOINT}/getSchedules`;
        return this.http.get<sasaki.factory.event.individualScreeningEvent.IEventWithOffer[]>(url, {
            params: <any>args
        }).toPromise();
    }

    /**
     * 劇場一覧取得
     * @method getTheaters
     */
    public getTheaters() {
        const url = `${SasakiMasterService.ENDPOINT}/getTheaters`;
        return this.http.get<sasaki.factory.organization.movieTheater.IPublicFields[]>(url).toPromise();
    }

    /**
     * 劇場取得
     * @method getTheaters
     */
    public getTheater(args: {
        /**
         * 枝番号
         */
        branchCode: string;
    }) {
        const url = `${SasakiMasterService.ENDPOINT}/getTheater`;
        return this.http.get<sasaki.factory.organization.movieTheater.IPublicFields>(url, {
            params: <any>args
        }).toPromise();
    }

}
