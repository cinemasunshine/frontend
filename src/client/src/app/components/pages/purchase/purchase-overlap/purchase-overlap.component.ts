import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { factory } from '../../../../../../../../node_modules/@motionpicture/sskts-api-javascript-client';
import { environment } from '../../../../../environments/environment';
import { TimeFormatPipe } from '../../../../pipes/time-format/time-format.pipe';
import { ErrorService, PurchaseService, SaveType, StorageService } from '../../../../services';

@Component({
    selector: 'app-purchase-overlap',
    templateUrl: './purchase-overlap.component.html',
    styleUrls: ['./purchase-overlap.component.scss']
})
export class PurchaseOverlapComponent implements OnInit {
    public screeningEvent: factory.chevre.event.screeningEvent.IEvent;

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
            this.screeningEvent = <factory.chevre.event.screeningEvent.IEvent>this.storage.load('screeningEvent', SaveType.Session);
            if (this.screeningEvent === null) {
                throw new Error('screeningEvent is null');
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
        this.storage.remove('screeningEvent', SaveType.Session);
        location.href = `${environment.ENTRANCE_SERVER_URL}/purchase/index.html?id=${this.screeningEvent.identifier}`;
    }

    /**
     * 劇場名取得
     * @method getTheaterName
     * @returns {string}
     */
    public getTheaterName() {
        return this.screeningEvent.superEvent.location.name.ja;
    }

    /**
     * スクリーン名取得
     * @method getScreenName
     * @returns {string}
     */
    public getScreenName() {
        return this.screeningEvent.location.name.ja;
    }

    /**
     * 作品名取得
     * @method getTitle
     * @returns {string}
     */
    public getTitle() {
        return this.screeningEvent.name.ja;
    }

    /**
     * 鑑賞日取得
     * @method getAppreciationDate
     * @returns {string}
     */
    public getAppreciationDate() {
        moment.locale('ja');

        return moment(this.screeningEvent.startDate).format('YYYY年MM月DD日(ddd)');
    }

    /**
     * 上映開始時間取得
     * @method getStartDate
     * @returns {string}
     */
    public getStartDate() {
        if (this.screeningEvent.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.screeningEvent.startDate,
            this.screeningEvent.coaInfo.dateJouei
        );
    }

    /**
     * 上映終了取得
     * @method getEndDate
     * @returns {string}
     */
    public getEndDate() {
        if (this.screeningEvent.coaInfo === undefined) {
            return '';
        }
        const timeFormat = new TimeFormatPipe();

        return timeFormat.transform(
            this.screeningEvent.endDate,
            this.screeningEvent.coaInfo.dateJouei
        );
    }

}
