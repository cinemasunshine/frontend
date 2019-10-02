import { Component, OnInit } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../../../environments/environment';
import { getOrderTicketPrice } from '../../../../../functions';
import { ErrorService, SaveType, StorageService, UserService } from '../../../../../services';
import { TimeFormatPipe } from '../../../../shared/pipes';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public data: {
        order: factory.order.IOrder;
        transaction: factory.transaction.placeOrder.ITransaction;
        seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    };
    public environment = environment;
    public getOrderTicketPrice = getOrderTicketPrice;

    constructor(
        private storage: StorageService,
        private error: ErrorService,
        public user: UserService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.data = this.storage.load('complete', SaveType.Session);
        if (this.data === null) {
            this.error.redirect(new Error('complete data is null'));
        }
    }

    /**
     * 印刷
     * @method print
     */
    public print() {
        print();
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return '';
        }

        return itemOffered.reservationFor.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return '';
        }

        return itemOffered.reservationFor.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return '';
        }

        return itemOffered.reservationFor.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
            || itemOffered.reservationFor.coaInfo === undefined) {
            return '';
        }
        moment.locale('ja');

        return moment(itemOffered.reservationFor.coaInfo.dateJouei).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
            || itemOffered.reservationFor.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            itemOffered.reservationFor.startDate,
            itemOffered.reservationFor.coaInfo.dateJouei
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        const itemOffered = this.data.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
            || itemOffered.reservationFor.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            itemOffered.reservationFor.endDate,
            itemOffered.reservationFor.coaInfo.dateJouei
        );
    }

}
