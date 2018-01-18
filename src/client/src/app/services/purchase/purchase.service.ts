import { Injectable } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as moment from 'moment';
import { SaveType, StorageService } from '../storage/storage.service';
type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;

@Injectable()
export class PurchaseService {

    public data: Idata;

    constructor(private storage: StorageService) {
        this.load();
    }

    /**
     * 読み込み
     * @method load
     */
    public load() {
        const data: Idata | null = this.storage.load('purchase', SaveType.Local);
        if (data === null) {
            this.data = {};

            return;
        }
        this.data = data;
    }

    /**
     * 保存
     * @method save
     */
    public save() {
        this.storage.save('purchase', this.data, SaveType.Local);
    }

    /**
     * リセット
     * @method reset
     */
    public reset() {

    }

    /**
     * 販売可能時間判定
     * @method isSalseTime
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalseTime(screeningEvent: IIndividualScreeningEvent): boolean {
        const END_TIME = 30; // 30分前

        return (moment().unix() < moment(screeningEvent.startDate).subtract(END_TIME, 'minutes').unix());
    }

    /**
     * 販売可能判定
     * @method isSalse
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    public isSalse(screeningEvent: IIndividualScreeningEvent): boolean {
        const PRE_SALE = '1'; // 先行販売

        return (moment(screeningEvent.coaInfo.rsvStartDate).unix() <= moment().unix()
            || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
    }

}

interface Idata {
    transaction?: sasaki.factory.transaction.placeOrder.ITransaction;
    individualScreeningEvent?: IIndividualScreeningEvent;
    movieTheaterOrganization?: sasaki.factory.organization.movieTheater.IPublicFields;
}
