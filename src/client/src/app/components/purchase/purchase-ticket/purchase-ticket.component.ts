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
    public discountConditionsModal: boolean;
    public notSelectModal: boolean;

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private sasakiPurchase: SasakiPurchaseService,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.purchase.load();
        this.isLoading = false;
        this.ticketsModal = false;
        this.discountConditionsModal = false;
        this.notSelectModal = false;
        this.setOffers();
        this.totalPrice = this.getTotalPrice();
    }

    /**
     * 次へ
     * @method onSubmit
     */
    public async onSubmit() {
        const notSelectOffers = this.offers.filter((offer) => {
            return (!offer.selected);
        });
        if (notSelectOffers.length > 0) {
            this.notSelectModal = true;

            return;
        }
        if (this.ticketValidation()) {
            window.scrollTo(0, 0);
            this.discountConditionsModal = true;

            return;
        }
        this.isLoading = true;
        try {
            if (this.purchase.data.transaction === undefined
                || this.purchase.data.tmpSeatReservationAuthorization === undefined
                || this.purchase.data.individualScreeningEvent === undefined) {
                throw new Error('status is different');
            }
            const changeSeatReservationArgs = {
                transactionId: this.purchase.data.transaction.id,
                actionId: this.purchase.data.tmpSeatReservationAuthorization.id,
                eventIdentifier: this.purchase.data.individualScreeningEvent.identifier,
                offers: this.offers.map((offer) => {
                    return {
                        seatSection: offer.seatSection,
                        seatNumber: offer.seatNumber,
                        ticketInfo: offer.ticketInfo
                    };
                })
            };
            this.purchase.data.seatReservationAuthorization =
                await this.sasakiPurchase.changeSeatReservation(changeSeatReservationArgs);
            this.purchase.save();
            this.router.navigate(['/purchase/input']);
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * オファーを登録
     * @method setOffers
     */
    private setOffers() {
        if (this.purchase.data.seatReservationAuthorization === undefined
            && this.purchase.data.tmpSeatReservationAuthorization !== undefined) {
            this.offers = this.purchase.data.tmpSeatReservationAuthorization.object.offers.map((offer) => {
                return {
                    price: offer.price,
                    priceCurrency: offer.priceCurrency,
                    seatNumber: offer.seatNumber,
                    seatSection: offer.seatSection,
                    mvtkNum: '',
                    selected: false,
                    glasses: (offer.ticketInfo.addGlasses > 0),
                    limitCount: 0,
                    limitUnit: '',
                    validation: false,
                    ticketInfo: offer.ticketInfo
                };
            });
        } else if (this.purchase.data.seatReservationAuthorization !== undefined) {
            console.log(this.purchase.data.seatReservationAuthorization);
            this.offers = this.purchase.data.seatReservationAuthorization.object.offers.map((offer) => {
                return {
                    price: offer.price,
                    priceCurrency: offer.priceCurrency,
                    seatNumber: offer.seatNumber,
                    seatSection: offer.seatSection,
                    mvtkNum: '',
                    selected: true,
                    glasses: (offer.ticketInfo.addGlasses > 0),
                    limitCount: 0,
                    limitUnit: '',
                    validation: false,
                    ticketInfo: offer.ticketInfo
                };
            });
        }
    }

    /**
     * 制限単位、人数制限判定
     * @method ticketValidation
     */
    public ticketValidation(): boolean {
        let result = false;
        for (const offer of this.offers) {
            if (offer.limitUnit === '001') {
                const unitLimitTickets = this.offers.filter((targetOffer) => {
                    return (targetOffer.limitUnit === '001' && targetOffer.limitCount === offer.limitCount);
                });
                if (unitLimitTickets.length % offer.limitCount !== 0) {
                    offer.validation = true;
                    result = true;
                }
            }
        }

        return result;
    }

    /**
     * 合計金額計算
     * @method getTotalPrice
     */
    public getTotalPrice(): number {
        let result = 0;
        const selectedOffers = this.offers.filter((offer) => {
            return (offer.selected);
        });
        for (const offer of selectedOffers) {
            result += offer.ticketInfo.salePrice;
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
        target.price = salesTicket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.selected = true;
        target.glasses = salesTicket.glasses;
        target.limitCount = salesTicket.limitCount;
        target.limitUnit = salesTicket.limitUnit;
        target.ticketInfo = {
            mvtkNum: '',
            ticketCode: salesTicket.ticketCode,
            ticketName: salesTicket.ticketName,
            mvtkAppPrice: 0,
            addGlasses: salesTicket.addGlasses,
            kbnEisyahousiki: '00',
            mvtkKbnDenshiken: '00',
            mvtkKbnMaeuriken: '00',
            mvtkKbnKensyu: '00',
            mvtkSalesPrice: 0,
            addPrice: salesTicket.addPrice,
            disPrice: 0,
            salePrice: salesTicket.salePrice,
            seatNum: this.selectOffer.seatNumber,
            stdPrice: salesTicket.stdPrice,
            ticketCount: 1,
            ticketNameEng: salesTicket.ticketNameEng,
            ticketNameKana: salesTicket.ticketNameKana
        };
        this.totalPrice = this.getTotalPrice();
        this.ticketsModal = false;
    }

}

interface Ioffer {
    price: number;
    priceCurrency: string;
    seatNumber: string;
    seatSection: string;
    selected: boolean;
    glasses: boolean;
    limitCount: number;
    limitUnit: string;
    validation: boolean;
    ticketInfo: {
        mvtkNum: string;
        ticketCode: string;
        ticketName: string;
        mvtkAppPrice: number;
        addGlasses: number;
        kbnEisyahousiki: string;
        mvtkKbnDenshiken: string;
        mvtkKbnMaeuriken: string;
        mvtkKbnKensyu: string;
        mvtkSalesPrice: number;
        addPrice: number,
        disPrice: number,
        salePrice: number,
        seatNum: string;
        stdPrice: number,
        ticketCount: number,
        ticketNameEng: string;
        ticketNameKana: string;
    };
}
