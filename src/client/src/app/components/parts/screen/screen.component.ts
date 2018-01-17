import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { ErrorService } from '../../../services/error/error.service';

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
    public screen: any;
    public setting: any;

    constructor(
        private http: HttpClient,
        private sasakiPurchase: SasakiPurchaseService,
        private purchase: PurchaseService,
        private error: ErrorService
    ) { }

    public async ngOnInit() {
        try {
            if (this.purchase.individualScreeningEvent === undefined) {
                throw new Error('status is different');
            }
            const DIGITS = {
                '02': 2,
                '03': 3
            };
            const theaterCode = `00${this.purchase.individualScreeningEvent.superEvent.location.branchCode}`.slice(DIGITS['02']);
            const screenCode = `000${this.purchase.individualScreeningEvent.location.branchCode}`.slice(DIGITS['03']);
            this.screen = await this.http.get(`/assets/json/theater/${theaterCode}/${screenCode}.json`);
            this.setting = await this.http.get('/assets/json/theater/setting.json');
        } catch (err) {
            this.error.redirect(new Error('status is different'));
        }
    }

}
