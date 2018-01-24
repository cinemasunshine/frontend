import { Component, OnInit } from '@angular/core';
import { IOrder } from '@motionpicture/sskts-factory/lib/factory/order';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { TimeFormatPipe } from '../../../pipes/time-format/time-format.pipe';
import { ErrorService } from '../../../services/error/error.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public order: IOrder;
    public environment = environment;

    constructor(
        private storage: StorageService,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.order = this.storage.load('order', SaveType.Session);
        if (this.order === null) {
            this.error.redirect(new Error('order is null'));
        }
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        return this.order.acceptedOffers[0].itemOffered.reservationFor.workPerformed.name;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        moment.locale('ja');

        return moment(this.order.acceptedOffers[0].itemOffered.reservationFor.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.order.acceptedOffers[0].itemOffered.reservationFor.coaInfo.dateJouei,
            this.order.acceptedOffers[0].itemOffered.reservationFor.startDate
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.order.acceptedOffers[0].itemOffered.reservationFor.coaInfo.dateJouei,
            this.order.acceptedOffers[0].itemOffered.reservationFor.endDate
        );
    }
}
