import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiMasterService } from '../../../services/sasaki/sasaki-master/sasaki-master.service';
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
        private sasakiMaster: SasakiMasterService,
        private purchase: PurchaseService,
        private error: ErrorService
    ) { }

    /**
     * 初期化
     */
    public async ngOnInit() {
        try {
            this.parameters = this.storage.load('parameters', SaveType.Session);
            if (!this.parametersChack()) {
                throw new Error('parameters is undefined');
            }
            // イベント情報取得
            const individualScreeningEvent = await this.sasakiMaster.getEvent({
                identifier: (<string>this.parameters.performanceId)
            });
            // 開始可能日判定
            if (!this.purchase.isSalse(individualScreeningEvent)) {
                throw new Error('Unable to start sales');
            }
            const END_TIME = 30;
            // 終了可能日判定
            if ( moment().add(END_TIME, 'minutes').unix() > moment(individualScreeningEvent.startDate).unix()) {
                throw new Error('unable to end sales');
            }
            if (this.purchase.data.tmpSeatReservationAuthorization !== undefined) {
                // 重複確認へ
                this.storage.save('individualScreeningEvent', individualScreeningEvent, SaveType.Session);
                this.router.navigate([`/purchase/overlap`]);

                return;
            }

             this.purchase.transactionStartProcess({
                passportToken: <string>this.parameters.passportToken,
                individualScreeningEvent: individualScreeningEvent
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
