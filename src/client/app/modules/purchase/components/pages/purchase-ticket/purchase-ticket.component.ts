import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { environment } from '../../../../../../environments/environment';
import { getTicketPrice, is4DX } from '../../../../../functions';
import {
    ErrorService,
    IMovieTicket,
    ISalesTicketResult,
    PurchaseService,
    UserService
} from '../../../../../services';

interface Ioffer {
    price?: number;
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
        usePoint?: number;
        spseatAdd1: number;
        spseatAdd2: number;
        spseatKbn: string;
    };
}

interface ISalesMovieTicket extends IMovieTicket {
    id: string;
    selected: boolean;
    addGlasses: number;
    salePrice: number;
    ticketName: string;
}

interface ISalesPointTicket extends ISalesTicketResult {
    id: string;
    selected: boolean;
}

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
    public originalSaleTickets: ISalesTicketResult[];
    public ltdSelected: Ioffer | undefined;
    public isLoading: boolean;
    public discountConditionsModal: boolean;
    public notSelectModal: boolean;
    public salesTickets: ISalesTicketResult[];
    public salesMvtkTickets: ISalesMovieTicket[];
    public salesMGTickets: ISalesMovieTicket[];
    public salesPointTickets: ISalesPointTicket[];
    public ticketForm: FormGroup;
    public getTicketPrice = getTicketPrice;
    public is4DX = is4DX;
    public movieTicketType = factory.chevre.paymentMethodType;

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
        try {
            this.salesTickets = this.createSalseTickets();
            this.salesMvtkTickets = this.createSalseMovieTickets({ paymentMethodType: factory.chevre.paymentMethodType.MovieTicket });
            this.salesMGTickets = this.createSalseMovieTickets({ paymentMethodType: factory.chevre.paymentMethodType.MGTicket });
            this.salesPointTickets = this.createSalsePointTickets();
            this.setOffers();
            this.totalPrice = this.getTotalPrice();
            this.updateSalseTickets();
            this.originalSaleTickets = [...this.salesTickets];
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * 販売可能チケット生成
     * @method createSalseTickets
     */
    private createSalseTickets() {
        const screeningEvent = this.purchase.data.screeningEvent;
        if (screeningEvent === undefined) {
            throw new Error('screeningEvent is undefined');
        }
        const pointInfo = environment.POINT_TICKET.find((ticket) => {
            return (screeningEvent.coaInfo !== undefined
                && ticket.THEATER === screeningEvent.coaInfo.theaterCode);
        });
        const results = [];
        for (const salesTicket of this.purchase.data.salesTickets) {
            if (pointInfo !== undefined) {
                // ポイント券種除外
                const pointTicketCodeList = pointInfo.TICKET_CODE;
                const ticketCode = pointTicketCodeList.find((pointTicketcode) => {
                    return pointTicketcode === salesTicket.ticketCode;
                });
                if (ticketCode !== undefined) {
                    continue;
                }
            }

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
     * 外部チケットリスト生成
     */
    private createSalseMovieTickets(params: { paymentMethodType: factory.chevre.paymentMethodType }) {
        const results = [];
        const paymentMethodType = params.paymentMethodType;
        const tickets = (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket)
            ? this.purchase.data.mvtkTickets
            : this.purchase.data.mgTickets;
        for (const ticket of tickets) {
            for (let i = 0; i < Number(ticket.ykknInfo.ykknKnshbtsmiNum); i++) {
                const DIGITS = -2;
                const count = `00${i}`.slice(DIGITS);
                const noGlassesBase = {
                    id: `${ticket.knyknrNoInfo.knyknrNo}${ticket.ykknInfo.ykknshTyp}${count}`,
                    selected: false,
                    addGlasses: 0,
                    salePrice: Number(ticket.ticketcodeResult.addPrice),
                    ticketName: ticket.ticketcodeResult.ticketName
                };
                const noGlasses = Object.assign(noGlassesBase, ticket);
                results.push(noGlasses);
                if (ticket.ticketcodeResult.addPriceGlasses > 0) {
                    // メガネあり券種作成
                    const glassesBase = {
                        id: `${ticket.knyknrNoInfo.knyknrNo}${ticket.ykknInfo.ykknshTyp}${count}`,
                        selected: false,
                        addGlasses: Number(ticket.ticketcodeResult.addPriceGlasses),
                        salePrice:
                            Number(ticket.ticketcodeResult.addPriceGlasses) + Number(ticket.ticketcodeResult.addPrice),
                        ticketName: `${ticket.ticketcodeResult.ticketName} メガネ込み`
                    };
                    const glasses = Object.assign(glassesBase, ticket);
                    results.push(glasses);
                }
            }
        }

        return results;
    }

    /**
     * ポイントチケット生成
     * @method createSalsePointTickets
     */
    private createSalsePointTickets() {
        const results = [];
        let count = 0;
        for (const pointTicket of this.purchase.data.pointTickets) {
            const salesTicket = this.purchase.data.salesTickets.find((ticket) => {
                return ticket.ticketCode === pointTicket.ticketCode;
            });
            if (salesTicket === undefined) {
                throw new Error('salesTicket is not found');
            }
            const data = {
                ticketCode: salesTicket.ticketCode,
                ticketName: salesTicket.ticketName,
                ticketNameKana: salesTicket.ticketNameKana,
                ticketNameEng: salesTicket.ticketNameEng,
                stdPrice: salesTicket.salePrice,
                addPrice: salesTicket.addPrice,
                salePrice: salesTicket.salePrice,
                limitCount: salesTicket.limitCount,
                limitUnit: salesTicket.limitUnit,
                ticketNote: salesTicket.ticketNote,
                addGlasses: salesTicket.addGlasses,
                selected: false,
                id: `${salesTicket.ticketCode}${count}`
            };
            const noGlassesBase = {};
            const noGlasses = Object.assign(noGlassesBase, data);
            noGlasses.addGlasses = 0;
            results.push(noGlasses);
            if (data.addGlasses > 0) {
                // メガネあり券種作成
                const glassesBase = {};
                const glasses = Object.assign(glassesBase, data);
                glasses.salePrice = glasses.salePrice + glasses.addGlasses;
                glasses.ticketName = `${glasses.ticketName}メガネ込み`;
                results.push(glasses);
            }
            count++;
        }

        return results;
    }

    /**
     * 券種リスト更新
     * @method updateSalseTickets
     */
    public updateSalseTickets() {
        // ムビチケ
        this.updateSalseMovieTickets({ paymentMethodType: factory.chevre.paymentMethodType.MovieTicket });
        // MGチケット
        this.updateSalseMovieTickets({ paymentMethodType: factory.chevre.paymentMethodType.MGTicket });
        // ポイント券種
        for (const ticket of this.salesPointTickets) {
            ticket.selected = false;
        }
        for (const offer of this.offers) {
            if (offer.ticketInfo.usePoint === 0) {
                continue;
            }
            // 選択済みへ変更
            const sameTicket = this.salesPointTickets.find((ticket) => {
                return (offer.ticketInfo.ticketCode === ticket.ticketCode
                    && !ticket.selected);
            });
            if (sameTicket !== undefined) {
                sameTicket.selected = true;
                const sameGlassesTicket = this.salesPointTickets.find((ticket) => {
                    return (sameTicket.id === ticket.id && !ticket.selected);
                });
                if (sameGlassesTicket !== undefined) {
                    sameGlassesTicket.selected = true;
                }
            }
        }
    }

    /**
     * 外部チケット券種リスト更新
     */
    public updateSalseMovieTickets(params: { paymentMethodType: factory.chevre.paymentMethodType }) {
        const paymentMethodType = params.paymentMethodType;
        const tickets = (paymentMethodType === factory.chevre.paymentMethodType.MovieTicket)
            ? this.salesMvtkTickets
            : this.salesMGTickets;
        for (const ticket of tickets) {
            ticket.selected = false;
        }
        for (const offer of this.offers) {
            if (offer.ticketInfo.mvtkNum === '') {
                continue;
            }
            // 選択済みへ変更
            const sameTicket = tickets.find((ticket) => {
                return (offer.ticketInfo.mvtkNum === ticket.knyknrNoInfo.knyknrNo
                    && offer.ticketInfo.ticketCode === ticket.ticketcodeResult.ticketCode
                    && !ticket.selected);
            });
            if (sameTicket !== undefined) {
                sameTicket.selected = true;
                const sameGlassesTicket = tickets.find((ticket) => {
                    return (sameTicket.id === ticket.id && !ticket.selected);
                });
                if (sameGlassesTicket !== undefined) {
                    sameGlassesTicket.selected = true;
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
        this.isLoading = true;
        if (this.purchase.isExpired()) {
            this.router.navigate(['/expired']);

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
            this.offers = this.purchase.data.tmpSeatReservationAuthorization.object.acceptedOffer.map((offer) => {

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
                    ticketInfo: (<any>offer.ticketInfo)
                };
            });
        } else if (this.purchase.data.seatReservationAuthorization !== undefined) {
            this.offers = this.purchase.data.seatReservationAuthorization.object.acceptedOffer.map((offer) => {
                if (offer.ticketInfo.mvtkNum !== '') {
                    // ムビチケ
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
                        ticketInfo: (<any>offer.ticketInfo)
                    };
                } else if (offer.ticketInfo.usePoint > 0) {
                    // ポイント
                    const ticket = this.salesPointTickets.find((salseTicket) => {
                        return (offer.ticketInfo.ticketCode === salseTicket.ticketCode
                            && offer.ticketInfo.addGlasses === salseTicket.addGlasses);
                    });

                    if (ticket === undefined) {
                        throw new Error('ticket is not found');
                    }

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
                        ticketInfo: (<any>offer.ticketInfo)
                    };
                } else {
                    // 通常
                    const ticket = this.salesTickets.find((salseTicket) => {
                        return (offer.ticketInfo.ticketCode === salseTicket.ticketCode
                            && offer.ticketInfo.addGlasses === salseTicket.addGlasses);
                    });

                    if (ticket === undefined) {
                        throw new Error('ticket is not found');
                    }

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
                        ticketInfo: (<any>offer.ticketInfo)
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
            result += getTicketPrice(offer);
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
     * @param {ISalesTicket} ticket
     * @param {boolean} glass
     */
    public selectSalseTicket(ticket: ISalesTicketResult) {
        const target = this.offers.find((offer) => {
            return (offer.seatNumber === this.selectOffer.seatNumber);
        });
        if (target === undefined) {
            this.ticketsModal = false;

            return;
        }
        if (this.purchase.data.screeningEvent !== undefined) {
            const ltdTicketCode = this.purchase.getMemberTicketCode();
            if (ltdTicketCode.indexOf(ticket.ticketCode) >= 0) {
                this.salesTickets = this.salesTickets.filter(
                    (t) => ltdTicketCode.indexOf(t.ticketCode) < 0
                );
                this.ltdSelected = target;
            } else if (this.ltdSelected === target) {
                this.ltdSelected = undefined;
                this.salesTickets = this.originalSaleTickets;
            }
        }
        const findTicket = this.purchase.data.pointTickets.find((pointTicket) => {
            return (pointTicket.ticketCode === ticket.ticketCode);
        });
        const usePoint = (findTicket !== undefined) ? findTicket.usePoint : 0;
        const spseatAdd1 = (target.ticketInfo.spseatAdd1 === undefined)
            ? 0 : target.ticketInfo.spseatAdd1;
        target.price = ticket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.selected = true;
        target.limitCount = ticket.limitCount;
        target.limitUnit = ticket.limitUnit;
        target.ticketInfo = {
            mvtkNum: '',
            ticketCode: ticket.ticketCode,
            ticketName: ticket.ticketName,
            mvtkAppPrice: 0,
            addGlasses: ticket.addGlasses,
            kbnEisyahousiki: '00',
            mvtkKbnDenshiken: '00',
            mvtkKbnMaeuriken: '00',
            mvtkKbnKensyu: '00',
            mvtkSalesPrice: 0,
            addPrice: ticket.addPrice,
            disPrice: 0,
            salePrice: ticket.salePrice + spseatAdd1,
            seatNum: this.selectOffer.seatNumber,
            stdPrice: ticket.stdPrice,
            ticketCount: 1,
            ticketNameEng: ticket.ticketNameEng,
            ticketNameKana: ticket.ticketNameKana,
            usePoint: usePoint,
            spseatAdd1: target.ticketInfo.spseatAdd1,
            spseatAdd2: target.ticketInfo.spseatAdd2,
            spseatKbn: target.ticketInfo.spseatKbn
        };
        this.totalPrice = this.getTotalPrice();
        this.updateSalseTickets();
        this.ticketsModal = false;
    }

    /**
     * 外部チケット券種選択
     */
    public selectMovieTicket(ticket: ISalesMovieTicket) {
        const target = this.offers.find((offer) => {
            return (offer.seatNumber === this.selectOffer.seatNumber);
        });
        if (target === undefined) {
            this.ticketsModal = false;

            return;
        }
        const spseatAdd1 = (target.ticketInfo.spseatAdd1 === undefined)
            ? 0 : target.ticketInfo.spseatAdd1;

        target.price = ticket.salePrice;
        target.priceCurrency = this.selectOffer.priceCurrency;
        target.seatNumber = this.selectOffer.seatNumber;
        target.seatSection = this.selectOffer.seatSection;
        target.selected = true;
        target.limitCount = 1;
        target.limitUnit = '001';
        target.ticketInfo = {
            mvtkNum: ticket.knyknrNoInfo.knyknrNo,
            ticketCode: ticket.ticketcodeResult.ticketCode,
            ticketName: ticket.ticketName,
            mvtkAppPrice: Number(ticket.ykknInfo.kijUnip),
            addGlasses: ticket.addGlasses,
            kbnEisyahousiki: ticket.ykknInfo.eishhshkTyp,
            mvtkKbnDenshiken: ticket.knyknrNoInfo.dnshKmTyp,
            mvtkKbnMaeuriken: ticket.knyknrNoInfo.znkkkytsknGkjknTyp,
            mvtkKbnKensyu: ticket.ykknInfo.ykknshTyp,
            mvtkSalesPrice: Number(ticket.ykknInfo.knshknhmbiUnip),
            addPrice: ticket.ticketcodeResult.addPrice,
            disPrice: 0,
            salePrice: ticket.salePrice + spseatAdd1,
            seatNum: this.selectOffer.seatNumber,
            stdPrice: 0,
            ticketCount: 1,
            ticketNameEng: ticket.ticketcodeResult.ticketNameEng,
            ticketNameKana: ticket.ticketcodeResult.ticketNameKana,
            spseatAdd1: target.ticketInfo.spseatAdd1,
            spseatAdd2: target.ticketInfo.spseatAdd2,
            spseatKbn: target.ticketInfo.spseatKbn
        };
        this.totalPrice = this.getTotalPrice();
        this.updateSalseTickets();
        this.ticketsModal = false;
    }

    /**
     * 販売券種金額取得
     */
    public getSalseTicketPrice(
        offer: ISalesTicketResult | ISalesMovieTicket | ISalesPointTicket
    ) {
        if (this.selectOffer === undefined) {
            return offer.salePrice;
        }
        const ticketInfo = this.selectOffer.ticketInfo;
        const spseatAdd1 = (ticketInfo.spseatAdd1 === undefined) ? 0 : ticketInfo.spseatAdd1;
        const spseatAdd2 = (ticketInfo.spseatAdd2 === undefined) ? 0 : ticketInfo.spseatAdd2;
        // console.log(offer.salePrice);
        return (offer.salePrice + spseatAdd1 + spseatAdd2);
    }

}
