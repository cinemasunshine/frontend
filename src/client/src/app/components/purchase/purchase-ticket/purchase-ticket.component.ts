import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error/error.service';
import { IMvtkTicket, ISalesTicketResult, PurchaseService } from '../../../services/purchase/purchase.service';
import { UserService } from '../../../services/user/user.service';

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
    public salesTickets: ISalesTicketResult[];
    public salesMvtkTickets: ISalesMvtkTicket[];
    public ticketForm: FormGroup;
    public disable: boolean;

    constructor(
        public purchase: PurchaseService,
        public user: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.purchase.load();
        this.isLoading = false;
        this.ticketsModal = false;
        this.discountConditionsModal = false;
        this.notSelectModal = false;
        this.ticketForm = this.formBuilder.group({});
        this.disable = false;
        try {
            this.salesTickets = this.createSalseTickets();
            this.salesMvtkTickets = this.createSalseMvtkTickets();
            this.setOffers();
            this.totalPrice = this.getTotalPrice();
            this.upDateSalseTickets();
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * 販売可能チケット生成
     * @method createSalseTickets
     */
    private createSalseTickets() {
        const results = [];
        for (const salesTicket of this.purchase.data.salesTickets) {
            const noGlassesBase = {};
            const noGlasses = Object.assign(noGlassesBase, salesTicket);
            noGlasses.addGlasses = 0;
            results.push(noGlasses);
            if (salesTicket.addGlasses > 0) {
                // メガネあり券種作成
                const glassesBase = {};
                const glasses = Object.assign(glassesBase, salesTicket);
                glasses.salePrice = glasses.salePrice + glasses.addGlasses;
                glasses.ticketName = `${glasses.ticketName}メガネ込み`;
                results.push(glasses);
            }
        }

        return results;
    }

    /**
     * ムビチケ券種リスト生成
     * @method createSalseMvtkTickets
     */
    private createSalseMvtkTickets() {
        const results = [];
        for (const mvtkTicket of this.purchase.data.mvtkTickets) {
            for (let i = 0; i < Number(mvtkTicket.ykknInfo.ykknKnshbtsmiNum); i++) {
                const DIGITS = -2;
                const count = `00${i}`.slice(DIGITS);
                const noGlassesBase = {
                    id: `${mvtkTicket.knyknrNoInfo.knyknrNo}${mvtkTicket.ykknInfo.ykknshTyp}${count}`,
                    selected: false,
                    addGlasses: 0,
                    salePrice: Number(mvtkTicket.mvtkTicketcodeResult.addPrice),
                    ticketName: mvtkTicket.mvtkTicketcodeResult.ticketName
                };
                const noGlasses = Object.assign(noGlassesBase, mvtkTicket);
                results.push(noGlasses);
                if (mvtkTicket.mvtkTicketcodeResult.addPriceGlasses > 0) {
                    // メガネあり券種作成
                    const glassesBase = {
                        id: `${mvtkTicket.knyknrNoInfo.knyknrNo}${mvtkTicket.ykknInfo.ykknshTyp}${count}`,
                        selected: false,
                        addGlasses: Number(mvtkTicket.mvtkTicketcodeResult.addPriceGlasses),
                        salePrice:
                            Number(mvtkTicket.mvtkTicketcodeResult.addPriceGlasses) + Number(mvtkTicket.mvtkTicketcodeResult.addPrice),
                        ticketName: `${mvtkTicket.mvtkTicketcodeResult.ticketName} メガネ込み`
                    };
                    const glasses = Object.assign(glassesBase, mvtkTicket);
                    results.push(glasses);
                }
            }
        }

        return results;
    }

    /**
     * 券種リスト更新
     * @method upDateSalseTickets
     */
    public upDateSalseTickets() {
        for (const mvtkTicket of this.salesMvtkTickets) {
            mvtkTicket.selected = false;
        }
        for (const offer of this.offers) {
            if (offer.ticketInfo.mvtkNum === '') {
                continue;
            }
            // 選択済みへ変更
            const sameMvtkTicket = this.salesMvtkTickets.find((mvtkTicket) => {
                return (offer.ticketInfo.mvtkNum === mvtkTicket.knyknrNoInfo.knyknrNo
                    && offer.ticketInfo.ticketCode === mvtkTicket.mvtkTicketcodeResult.ticketCode
                    && !mvtkTicket.selected);
            });
            if (sameMvtkTicket !== undefined) {
                sameMvtkTicket.selected = true;
                const sameGlassesMvtkTicket = this.salesMvtkTickets.find((mvtkTicket) => {
                    return (sameMvtkTicket.id === mvtkTicket.id && !mvtkTicket.selected);
                });
                if (sameGlassesMvtkTicket !== undefined) {
                    sameGlassesMvtkTicket.selected = true;
                }
            }
        }
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
        if (this.disable) {
            return;
        }
        this.disable = true;
        this.isLoading = true;
        if (this.purchase.isExpired()) {
            this.router.navigate(['expired']);

            return;
        }
        try {
            const offers = this.offers.map((offer) => {
                return {
                    seatSection: offer.seatSection,
                    seatNumber: offer.seatNumber,
                    ticketInfo: offer.ticketInfo
                };
            });
            await this.purchase.ticketRegistrationProcess(offers);
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
                    limitCount: 0,
                    limitUnit: '',
                    validation: false,
                    ticketInfo: offer.ticketInfo
                };
            });
        } else if (this.purchase.data.seatReservationAuthorization !== undefined) {
            this.offers = this.purchase.data.seatReservationAuthorization.object.offers.map((offer) => {
                if (offer.ticketInfo.mvtkNum === '') {
                    const ticket = <ISalesTicketResult>this.salesTickets.find((salseTicket) => {
                        return (offer.ticketInfo.ticketCode === salseTicket.ticketCode
                            && offer.ticketInfo.addGlasses === salseTicket.addGlasses);
                    });

                    return {
                        price: offer.price,
                        priceCurrency: offer.priceCurrency,
                        seatNumber: offer.seatNumber,
                        seatSection: offer.seatSection,
                        mvtkNum: offer.ticketInfo.mvtkNum,
                        selected: true,
                        limitCount: ticket.limitCount,
                        limitUnit: ticket.limitUnit,
                        validation: false,
                        ticketInfo: offer.ticketInfo
                    };
                } else {
                    return {
                        price: offer.price,
                        priceCurrency: offer.priceCurrency,
                        seatNumber: offer.seatNumber,
                        seatSection: offer.seatSection,
                        mvtkNum: offer.ticketInfo.mvtkNum,
                        selected: true,
                        limitCount: 1,
                        limitUnit: '001',
                        validation: false,
                        ticketInfo: offer.ticketInfo
                    };
                }
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
    public ticketSelect(offer: Ioffer) {
        this.selectOffer = offer;
        this.ticketsModal = true;
    }

    /**
     * 販売可能券種選択
     * @method selectSalseTicket
     * @param {ISalesTicket} sticket
     * @param {boolean} glass
     */
    public selectSalseTicket(sticket: ISalesTicketResult) {
        const target = this.offers.find((offer) => {
            return (offer.seatNumber === this.selectOffer.seatNumber);
        });
        if (target === undefined) {
            this.ticketsModal = false;

            return;
        }
        target.price = sticket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.selected = true;
        target.limitCount = sticket.limitCount;
        target.limitUnit = sticket.limitUnit;
        target.ticketInfo = {
            mvtkNum: '',
            ticketCode: sticket.ticketCode,
            ticketName: sticket.ticketName,
            mvtkAppPrice: 0,
            addGlasses: sticket.addGlasses,
            kbnEisyahousiki: '00',
            mvtkKbnDenshiken: '00',
            mvtkKbnMaeuriken: '00',
            mvtkKbnKensyu: '00',
            mvtkSalesPrice: 0,
            addPrice: sticket.addPrice,
            disPrice: 0,
            salePrice: sticket.salePrice,
            seatNum: this.selectOffer.seatNumber,
            stdPrice: sticket.stdPrice,
            ticketCount: 1,
            ticketNameEng: sticket.ticketNameEng,
            ticketNameKana: sticket.ticketNameKana
        };
        this.totalPrice = this.getTotalPrice();
        this.upDateSalseTickets();
        this.ticketsModal = false;
    }

    /**
     * ムビチケ券種選択
     * @method selectMvtkTicket
     * @param {ISalesMvtkTicket} sticket
     * @param {boolean} glass
     */
    public selectMvtkTicket(ticket: ISalesMvtkTicket) {
        const target = this.offers.find((offer) => {
            return (offer.seatNumber === this.selectOffer.seatNumber);
        });
        if (target === undefined) {
            this.ticketsModal = false;

            return;
        }

        target.price = ticket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.selected = true;
        target.limitCount = 1;
        target.limitUnit = '001';
        target.ticketInfo = {
            mvtkNum: ticket.knyknrNoInfo.knyknrNo,
            ticketCode: ticket.mvtkTicketcodeResult.ticketCode,
            ticketName: ticket.ticketName,
            mvtkAppPrice: Number(ticket.ykknInfo.kijUnip),
            addGlasses: ticket.addGlasses,
            kbnEisyahousiki: ticket.ykknInfo.eishhshkTyp,
            mvtkKbnDenshiken: ticket.knyknrNoInfo.dnshKmTyp,
            mvtkKbnMaeuriken: ticket.knyknrNoInfo.znkkkytsknGkjknTyp,
            mvtkKbnKensyu: ticket.ykknInfo.ykknshTyp,
            mvtkSalesPrice: Number(ticket.ykknInfo.knshknhmbiUnip),
            addPrice: ticket.mvtkTicketcodeResult.addPrice,
            disPrice: 0,
            salePrice: ticket.salePrice,
            seatNum: this.selectOffer.seatNumber,
            stdPrice: 0,
            ticketCount: 1,
            ticketNameEng: ticket.mvtkTicketcodeResult.ticketNameEng,
            ticketNameKana: ticket.mvtkTicketcodeResult.ticketNameKana
        };
        this.totalPrice = this.getTotalPrice();
        this.upDateSalseTickets();
        this.ticketsModal = false;
    }

}

interface Ioffer {
    price: number;
    priceCurrency: string;
    seatNumber: string;
    seatSection: string;
    selected: boolean;
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

interface ISalesMvtkTicket extends IMvtkTicket {
    id: string;
    selected: boolean;
    addGlasses: number;
    salePrice: number;
    ticketName: string;
}
