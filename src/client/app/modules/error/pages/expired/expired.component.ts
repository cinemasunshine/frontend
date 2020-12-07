import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { PurchaseService } from '../../../../services';

@Component({
    selector: 'app-expired',
    templateUrl: './expired.component.html',
    styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit {
    public environment = environment;
    constructor(public purchase: PurchaseService) { }

    public async ngOnInit() {
        try {
            await this.purchase.cancelTransaction();
        } catch (error) {
            console.error(error);
        }
        this.purchase.reset();
    }

}
