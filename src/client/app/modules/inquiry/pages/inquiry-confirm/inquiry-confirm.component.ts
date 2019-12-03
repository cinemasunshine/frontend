import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import * as qrcode from 'qrcode';
import { environment } from '../../../../../environments/environment';
import { ErrorService, InquiryService } from '../../../../services';
import { TimeFormatPipe } from '../../../shared/pipes';

@Component({
    selector: 'app-inquiry-confirm',
    templateUrl: './inquiry-confirm.component.html',
    styleUrls: ['./inquiry-confirm.component.scss']
})
export class InquiryConfirmComponent implements OnInit {

    public isLoading: boolean;
    public order: factory.order.IOrder;
    public seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
    public moment = moment;
    public tokenList: string[];
    constructor(
        private inquiryService: InquiryService,
        private errorService: ErrorService
    ) { }

    public async ngOnInit() {
        if (this.inquiryService.data.order === undefined
            || this.inquiryService.data.seller === undefined) {
            this.errorService.redirect(new Error('order or seller notfound'));
            return;
        }
        this.isLoading = true;
        this.order = this.inquiryService.data.order;
        this.seller = this.inquiryService.data.seller;
        this.tokenList = [];
        for (const acceptedOffer of this.order.acceptedOffers) {
            if (acceptedOffer.itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
                || acceptedOffer.itemOffered.reservedTicket.ticketToken === undefined) {
                this.tokenList.push('');
            } else {
                const url = await this.createQRCode(acceptedOffer.itemOffered.reservedTicket.ticketToken);
                this.tokenList.push(url);
            }
        }
        this.isLoading = false;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName(): string {
        if (this.order.acceptedOffers.length === 0) {
            return '';
        }
        const itemOffered = this.order.acceptedOffers[0].itemOffered;
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
    public getTitle(): string {
        if (this.order.acceptedOffers.length === 0) {
            return '';
        }
        const itemOffered = this.order.acceptedOffers[0].itemOffered;
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
    public getAppreciationDate(): string {
        if (this.order.acceptedOffers.length === 0) {
            return '';
        }
        const itemOffered = this.order.acceptedOffers[0].itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
            || itemOffered.reservationFor.coaInfo === undefined) {
            return '';
        }

        return moment(itemOffered.reservationFor.coaInfo.dateJouei).locale('ja').format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate(): string {
        if (this.order.acceptedOffers.length === 0) {
            return '';
        }
        const itemOffered = this.order.acceptedOffers[0].itemOffered;
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
    public getEndDate(): string {
        if (this.order.acceptedOffers.length === 0) {
            return '';
        }
        const itemOffered = this.order.acceptedOffers[0].itemOffered;
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

    /**
     * 特別席判定（グランドシネマサンシャイン）
     */
    public isGrandSpecialSeat(itemOffered: factory.order.IItemOffered, specialSeat: '002' | '003') {
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return false;
        }
        const screenPrefix = (environment.production) ? '0' : '1';
        return (itemOffered.reservationFor.superEvent.location.branchCode === (screenPrefix + '20')
            && itemOffered.reservedTicket.coaTicketInfo !== undefined
            && (<any>itemOffered.reservedTicket.coaTicketInfo).spseatKbn === specialSeat
            && (<any>itemOffered.reservedTicket.coaTicketInfo).spseatAdd2 > 0);
    }

    /**
     * QRコード生成
     * @param token
     */
    public async createQRCode(token: string) {
        const basicSize = 21;
        const option: qrcode.QRCodeToDataURLOptions = {
            margin: 0,
            scale: (100 / basicSize)
        };
        const url = await qrcode.toDataURL(token, option);
        return url;
    }

    /**
     * チケットまで移動
     */
    public scrollToTicket() {
        setTimeout(() => {
            const target = <HTMLElement>document.querySelector('.qr-tickets');
            if (target === null) {
                return;
            }
            const rect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const top = rect.top + scrollTop - 50;
            window.scrollTo(0, top);
        }, 0);
    }

}
