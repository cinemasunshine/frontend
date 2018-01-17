import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiMasterService } from '../../../services/sasaki/sasaki-master/sasaki-master.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-transaction',
    templateUrl: './purchase-transaction.component.html',
    styleUrls: ['./purchase-transaction.component.scss']
})
export class PurchaseTransactionComponent implements OnInit {
    public parameters: {
        /**
         * パフォーマンスId
         */
        performanceId?: string;
        /**
         * WAITER許可証トークン
         */
        passportToken?: string;
        /**
         * awsCognitoIdentityId
         */
        identityId?: string;
    };
    constructor(
        private storage: StorageService,
        private router: Router,
        private sasakiPurchase: SasakiPurchaseService,
        private sasakiMaster: SasakiMasterService,
        private purchase: PurchaseService,
        private error: ErrorService
    ) { }

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.parameters = this.storage.load('parameters', SaveType.Session);
        if (!this.parametersChack()) {
            this.router.navigate(['/error']);

            return;
        }
        try {
            // イベント情報取得
            this.purchase.individualScreeningEvent = await this.sasakiMaster.getEvent({
                identifier: (<string>this.parameters.performanceId)
            });
            // 開始可能日判定
            if (!this.purchase.isSalse(this.purchase.individualScreeningEvent)) {
                throw new Error('Unable to start sales');
            }
            const END_TIME = 30;
            // 終了可能日判定
            if ( moment().add(END_TIME, 'minutes').unix() > moment(this.purchase.individualScreeningEvent.startDate).unix()) {
                throw new Error('unable to end sales');
            }
            // TODO
            // 重複確認

            // TODO
            // 購入データ削除
            // this.purchase.reset();

            // 劇場のショップを検索
            this.purchase.movieTheaterOrganization = await this.sasakiMaster.getTheater({
                branchCode: this.purchase.individualScreeningEvent.coaInfo.theaterCode
            });
            console.log(this.purchase);
            const VALID_TIME = 15;
            // 取引開始
            this.purchase.transaction = await this.sasakiPurchase.transactionStart({
                expires: (<any>moment().add(VALID_TIME, 'minutes').toISOString()),
                sellerId: this.purchase.movieTheaterOrganization.id,
                passportToken: (<string>this.parameters.passportToken)
            });
            this.router.navigate(['/purchase/seat'], { replaceUrl: true });
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * @method parametersChack
     * @requires {boolean}
     */
    private parametersChack(): boolean {
        let result = true;
        if (this.parameters.passportToken === undefined
            || this.parameters.performanceId === undefined) {
            result = false;
        }

        return result;
    }

}
