import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-transaction',
    templateUrl: './purchase-transaction.component.html',
    styleUrls: ['./purchase-transaction.component.scss']
})
export class PurchaseTransactionComponent implements OnInit {
    public parameters: any;
    constructor(
        private storage: StorageService,
        private router: Router,
        private sasakiPurchase: SasakiPurchaseService
    ) { }

    public ngOnInit() {
        this.parameters = this.storage.load('parameters', SaveType.Session);

    }

}
