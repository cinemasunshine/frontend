import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { ErrorService, IMovieTicket, PurchaseService } from '../../../../../services';

@Component({
    selector: 'app-purchase-mvtk-confirm',
    templateUrl: './purchase-mvtk-confirm.component.html',
    styleUrls: ['./purchase-mvtk-confirm.component.scss']
})
export class PurchaseMvtkConfirmComponent implements OnInit {
    public tickets: IMovieTicket[];
    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.tickets = this.purchase.data.movieTickets.filter(m => {
            return m.paymentMethodType === factory.chevre.paymentMethodType.MovieTicket;
        });
        if (this.tickets.length === 0) {
            this.error.redirect(new Error('status is different'));
        }
        // console.log(this.purchase.data.mvtkTickets);
    }

    public onSubmit() {
        this.router.navigate(['/purchase/ticket']);
    }

}
