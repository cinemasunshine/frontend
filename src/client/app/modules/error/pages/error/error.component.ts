import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ErrorService, PurchaseService } from '../../../../services';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    public environment = environment;
    public message: string;
    constructor(
        public purchase: PurchaseService,
        private error: ErrorService
    ) { }

    public async ngOnInit() {
        try {
            await this.purchase.cancelTransaction();
        } catch (error) {
            console.error(error);
        }
        this.purchase.reset();
        this.message = (this.error.errorDetail !== undefined) ? this.error.errorDetail.message : '';
    }

}
