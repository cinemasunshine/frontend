import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as moment from 'moment';

type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

@Injectable()
export class SalseChackService {

    constructor() { }

    /**
     * 販売可能時間判定
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalseTime(screeningEvent: IIndividualScreeningEvent): boolean {
        const END_TIME = 30; // 30分前

        return (moment().unix() < moment(screeningEvent.startDate).subtract(END_TIME, 'minutes').unix());
    }

    /**
     * 販売可能判定
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalse(screeningEvent: IIndividualScreeningEvent): boolean {
        const PRE_SALE = '1'; // 先行販売

        return (screeningEvent.coaInfo.rsvStartDate <= moment().format('YYYYMMDD')
            || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
    }

}
