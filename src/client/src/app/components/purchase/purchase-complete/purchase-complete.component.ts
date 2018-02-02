import { Component, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-nodejs-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { TimeFormatPipe } from '../../../pipes/time-format/time-format.pipe';
import { ErrorService } from '../../../services/error/error.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public order: sasaki.factory.order.IOrder;
    public transaction: sasaki.factory.transaction.placeOrder.ITransaction;
    public environment = environment;

    constructor(
        private storage: StorageService,
        private error: ErrorService,
        private sasakiPurchase: SasakiPurchaseService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.order = this.storage.load('order', SaveType.Session);
        this.transaction = this.storage.load('transaction', SaveType.Session);
        if (this.order === null || this.transaction === null) {
            this.error.redirect(new Error('order or transaction is null'));
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

    /**
     * メール送信処理
     */
    public async mailSendProcess() {
        const text = ``;
        const sendEmailNotificationArgs = {
            transactionId: this.transaction.id,
            emailMessageAttributes: {
                sender: {
                    name: this.order.seller.name,
                    email: 'noreply@ticket-cinemasunshine.com'
                },
                toRecipient: {
                    name: `${this.order.customer.familyName} ${this.order.customer.givenName}`,
                    email: this.order.customer.email
                },
                about: `${this.order.seller.name} 購入完了`,
                text: text
            }
        };
        await this.sasakiPurchase.sendEmailNotification(sendEmailNotificationArgs);
    }
}
