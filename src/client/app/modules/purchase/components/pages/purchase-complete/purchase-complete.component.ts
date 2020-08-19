import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
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
        seller: factory.chevre.seller.ISeller;
        incentive: number;
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

    public getReservationNumber() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined) ? '' : itemOffered.reservationNumber;
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined
            || itemOffered.reservationFor.superEvent.location.name === undefined
            || itemOffered.reservationFor.superEvent.location.name.ja === undefined)
            ? ''
            : itemOffered.reservationFor.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined
            || itemOffered.reservationFor.location.name === undefined
            || itemOffered.reservationFor.location.name.ja === undefined)
            ? ''
            : itemOffered.reservationFor.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined) ? '' : itemOffered.reservationFor.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined
            || itemOffered.reservationFor.coaInfo === undefined)
            ? ''
            : moment(itemOffered.reservationFor.coaInfo.dateJouei).locale('ja').format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const itemOffered = this.getItemOffered();
        const timeFormat = new TimeFormatPipe();

        return (itemOffered === undefined
            || itemOffered.reservationFor.coaInfo === undefined)
            ? ''
            : timeFormat.transform(
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
        const itemOffered = this.getItemOffered();
        const timeFormat = new TimeFormatPipe();

        return (itemOffered === undefined
            || itemOffered.reservationFor.coaInfo === undefined)
            ? ''
            : timeFormat.transform(
                itemOffered.reservationFor.endDate,
                itemOffered.reservationFor.coaInfo.dateJouei
            );
    }

    private getItemOffered() {
        if (this.data.order.acceptedOffers.length === 0
            || this.data.order.acceptedOffers[0].itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return undefined;
        }
        const itemOffered = <factory.chevre.reservation.IReservation<
            factory.chevre.reservationType.EventReservation
        >>this.data.order.acceptedOffers[0].itemOffered;

        return itemOffered;
    }

}
