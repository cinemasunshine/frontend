import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService, PurchaseService } from '../../../../../services';

@Component({
    selector: 'app-purchase-mvtk-confirm',
    templateUrl: './purchase-mvtk-confirm.component.html',
    styleUrls: ['./purchase-mvtk-confirm.component.scss']
})
export class PurchaseMvtkConfirmComponent implements OnInit {

    constructor(
        public purchase: PurchaseService,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        if (this.purchase.data.movieTickets === undefined) {
            this.error.redirect(new Error('status is different'));
        }
        // console.log(this.purchase.data.mvtkTickets);
    }

    public onSubmit() {
        this.router.navigate(['/purchase/ticket']);
    }

}
