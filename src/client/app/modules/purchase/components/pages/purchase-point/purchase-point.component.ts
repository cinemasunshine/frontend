import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as COA from '@motionpicture/coa-service';
import {
    CinerinoService,
    ErrorService,
    FlgMember,
    PurchaseService,
    UserService
} from '../../../../../services';


@Component({
    selector: 'app-purchase-point',
    templateUrl: './purchase-point.component.html',
    styleUrls: ['./purchase-point.component.scss']
})
export class PurchasePointComponent implements OnInit {

    public isLoading: boolean;
    public pointTickets: COA.factory.master.ITicketResult[];
    public ticketValueList: number[];
    public selectTickets: {
        [key: string]: number;
    };
    public pointAhortageAlertModal: boolean;
    public notSelectAlertModal: boolean;
    public availableBalance: number;

    constructor(
        public user: UserService,
        private cinerinoService: CinerinoService,
        private purchase: PurchaseService,
        private error: ErrorService,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.pointAhortageAlertModal = false;
        this.isLoading = true;
        this.pointTickets = [];
        this.selectTickets = {};
        try {
            const screeningEvent = this.purchase.data.screeningEvent;
            const tmpSeatReservationAuthorization = this.purchase.data.tmpSeatReservationAuthorization;
            if (screeningEvent === undefined
                || screeningEvent.coaInfo === undefined
                || tmpSeatReservationAuthorization === undefined
                || this.user.data.account === undefined) {
                throw new Error('status is different');
            }
            this.availableBalance = (<
                factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount>
                >this.user.data.account).typeOfGood.availableBalance;
            const reserveLength = tmpSeatReservationAuthorization.object.acceptedOffer.length;
            this.ticketValueList = [];
            for (let i = 0; i < (reserveLength + 1); i++) {
                this.ticketValueList.push(i);
            }
            const masterTickets = await this.cinerinoService.getTickets({
                theaterCode: screeningEvent.coaInfo.theaterCode
            });
            this.pointTickets = masterTickets.filter((masterTicket) => {
                const salesTicket = this.purchase.data.salesTickets.find((ticket) => {
                    return ticket.ticketCode === masterTicket.ticketCode;
                });
                return (masterTicket.usePoint > 0
                    && masterTicket.flgMember === FlgMember.Member
                    && salesTicket !== undefined);
            });
            for (const pointTicket of this.pointTickets) {
                this.selectTickets[pointTicket.ticketCode] = 0;
            }
            // console.log('pointTickets', this.pointTickets);
        } catch (err) {
            this.error.redirect(err);
        }
        this.isLoading = false;
    }

    public onSubmit() {
        let usePoint = 0;
        for (const ticket of this.pointTickets) {
            usePoint += ticket.usePoint * this.selectTickets[ticket.ticketCode];
        }
        if (this.user.data.account === undefined) {
            this.error.redirect(new Error('account is undefined'));

            return;
        }
        if (usePoint === 0) {
            this.notSelectAlertModal = true;

            return;
        }
        const account = <
            factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount>
            >this.user.data.account;
        if (account.typeOfGood.availableBalance < usePoint) {
            this.pointAhortageAlertModal = true;

            return;
        }
        this.purchase.data.pointTickets = [];
        for (const ticket of this.pointTickets) {
            for (let i = 0; i < this.selectTickets[ticket.ticketCode]; i++) {
                this.purchase.data.pointTickets.push(ticket);
            }
        }
        this.purchase.save();
        this.router.navigate(['/purchase/ticket']);
    }

}
