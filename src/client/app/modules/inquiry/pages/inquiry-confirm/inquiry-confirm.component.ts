import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
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
    public seller: factory.chevre.seller.ISeller;
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
            const itemOffered = <factory.chevre.reservation.IReservation<
                factory.chevre.reservationType.EventReservation
            >>acceptedOffer.itemOffered;
            if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation
                || itemOffered.reservedTicket.ticketToken === undefined) {
                this.tokenList.push('');
            } else {
                const url = await this.createQRCode(itemOffered.reservedTicket.ticketToken);
                this.tokenList.push(url);
            }
        }
        this.isLoading = false;
    }

    public getReservationNumber() {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined) ? '' : itemOffered.reservationNumber;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName(): string {
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
    public getTitle(): string {
        const itemOffered = this.getItemOffered();

        return (itemOffered === undefined
            || itemOffered.reservationFor.name.ja === undefined)
            ? ''
            : itemOffered.reservationFor.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate(): string {
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
    public getStartDate(): string {
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
    public getEndDate(): string {
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

    /**
     * 特別席判定（グランドシネマサンシャイン）
     */
    public isGrandSpecialSeat(
        itemOffered: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>,
        specialSeat: '002' | '003'
    ) {
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return false;
        }
        const screenPrefix = (environment.production) ? '0' : '1';
        return (itemOffered.reservationFor.superEvent.location.branchCode === (screenPrefix + '20')
            && itemOffered.reservedTicket.coaTicketInfo !== undefined
            && (itemOffered.reservedTicket.coaTicketInfo).spseatKbn === specialSeat
            && (itemOffered.reservedTicket.coaTicketInfo).spseatAdd2 > 0);
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

    private getItemOffered() {
        if (this.order.acceptedOffers.length === 0
            || this.order.acceptedOffers[0].itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return undefined;
        }
        const itemOffered = <factory.chevre.reservation.IReservation<
            factory.chevre.reservationType.EventReservation
        >>this.order.acceptedOffers[0].itemOffered;

        return itemOffered;
    }

}
