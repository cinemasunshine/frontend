import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error/error.service';
import { ISalesTicket, PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';

@Component({
    selector: 'app-purchase-ticket',
    templateUrl: './purchase-ticket.component.html',
    styleUrls: ['./purchase-ticket.component.scss']
})
export class PurchaseTicketComponent implements OnInit {
    public offers: Ioffer[];
    public totalPrice: number;
    public selectOffer: Ioffer;
    public ticketsModal: boolean;
    public isLoading: boolean;

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private sasakiPurchase: SasakiPurchaseService,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        this.purchase.load();
        this.isLoading = false;
        this.ticketsModal = false;
        if (this.purchase.data.seatReservationAuthorization === undefined
            && this.purchase.data.tmpSeatReservationAuthorization !== undefined) {
            this.offers = this.purchase.data.tmpSeatReservationAuthorization.object.offers.map((offer) => {
                return {
                    ticketCode: offer.ticketInfo.ticketCode,
                    ticketName: offer.ticketInfo.ticketName,
                    addGlasses: offer.ticketInfo.addGlasses,
                    price: offer.price,
                    priceCurrency: offer.priceCurrency,
                    seatNumber: offer.seatNumber,
                    seatSection: offer.seatSection,
                    mvtkNum: '',
                    selected: false,
                    glasses: (offer.ticketInfo.addGlasses > 0),
                    limitCount: 0,
                    limitUnit: ''
                };
            });
        } else if (this.purchase.data.seatReservationAuthorization !== undefined) {
            this.offers = this.purchase.data.seatReservationAuthorization.object.offers.map((offer) => {
                return {
                    ticketCode: offer.ticketInfo.ticketCode,
                    ticketName: offer.ticketInfo.ticketName,
                    addGlasses: offer.ticketInfo.addGlasses,
                    price: offer.price,
                    priceCurrency: offer.priceCurrency,
                    seatNumber: offer.seatNumber,
                    seatSection: offer.seatSection,
                    mvtkNum: '',
                    selected: true,
                    glasses: (offer.ticketInfo.addGlasses > 0),
                    limitCount: 0,
                    limitUnit: ''
                };
            });
        }
        this.totalPrice = this.getTotalPrice();
    }

    public getTotalPrice(): number {
        let result = 0;
        const selectedOffers = this.offers.filter((offer) => {
            return (offer.selected);
        });
        for (const offer of selectedOffers) {
            result += offer.price;
            if (offer.glasses) {
                result += offer.addGlasses;
            }
        }

        return result;
    }

    /**
     * 券種選択
     * @method ticketSelect
     * @param {Event} event
     * @param {Ioffer} offer
     */
    public ticketSelect(event: Event, offer: Ioffer) {
        event.preventDefault();
        this.selectOffer = offer;
        this.ticketsModal = true;
    }

    /**
     * 販売可能券種選択
     * @method selectSalseTicket
     * @param {Event} event
     * @param {ISalesTicket} salesTicket
     * @param {boolean} glass
     */
    public selectSalseTicket(event: Event, salesTicket: ISalesTicket) {
        event.preventDefault();
        this.selectOffer.glasses = salesTicket.glasses;
        const target = this.offers.find((offer) => {
            return (offer.seatNumber === this.selectOffer.seatNumber);
        });
        if (target === undefined) {
            this.ticketsModal = false;

            return;
        }
        target.ticketCode = salesTicket.ticketCode;
        target.ticketName = salesTicket.ticketName;
        target.addGlasses = salesTicket.addGlasses;
        target.price = salesTicket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.mvtkNum = '';
        target.selected = true;
        target.glasses = salesTicket.glasses;
        target.limitCount = salesTicket.limitCount;
        target.limitUnit = salesTicket.limitUnit;
        this.totalPrice = this.getTotalPrice();
        this.ticketsModal = false;
    }

}

interface Ioffer {
    ticketCode: string;
    ticketName: string;
    price: number;
    priceCurrency: string;
    seatNumber: string;
    seatSection: string;
    mvtkNum: string;
    addGlasses: number;
    selected: boolean;
    glasses: boolean;
    limitCount: number;
    limitUnit: string;
}
