import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { TimeFormatPipe } from '../../../pipes/time-format/time-format.pipe';
import { ErrorService } from '../../../services/error/error.service';
import { IIndividualScreeningEvent, PurchaseService } from '../../../services/purchase/purchase.service';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

@Component({
    selector: 'app-purchase-overlap',
    templateUrl: './purchase-overlap.component.html',
    styleUrls: ['./purchase-overlap.component.scss']
})
export class PurchaseOverlapComponent implements OnInit {
    public individualScreeningEvent: IIndividualScreeningEvent;

    constructor(
        private storage: StorageService,
        public purchase: PurchaseService,
        private router: Router,
        private error: ErrorService
    ) { }

    public async ngOnInit() {
        window.scrollTo(0, 0);
        try {
            // イベント情報取得
            this.individualScreeningEvent = <IIndividualScreeningEvent>this.storage.load('individualScreeningEvent', SaveType.Session);
            if (this.individualScreeningEvent === null) {
                throw new Error('individualScreeningEvent is null');
            }
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * 予約中のフローへ戻る
     */
    public returnTransaction() {
        this.router.navigate(['/purchase/seat']);
    }

    /**
     * 新しい取引へ
     */
    public async newTransaction() {
        try {
            await this.purchase.cancelSeatRegistrationProcess();
        } catch (err) {
            console.error(err);
        }
        this.storage.remove('individualScreeningEvent', SaveType.Session);
        location.href = `${environment.ENTRANCE_SERVER_URL}/purchase/index.html?id=${this.individualScreeningEvent.identifier}`;
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        return this.individualScreeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        return this.individualScreeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        return this.individualScreeningEvent.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        moment.locale('ja');

        return moment(this.individualScreeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.individualScreeningEvent.startDate,
            this.individualScreeningEvent.coaInfo.dateJouei
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.individualScreeningEvent.endDate,
            this.individualScreeningEvent.coaInfo.dateJouei
        );
    }

}
