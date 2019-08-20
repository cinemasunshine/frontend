import { Component, OnInit } from '@angular/core';
import { factory } from '@motionpicture/sskts-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../../environments/environment';
import { ErrorService, PurchaseService, SasakiService } from '../../../../services';

type IMovieTheater = factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
interface IFilmOrder {
    id: string;
    films: factory.chevre.event.screeningEvent.IEvent[];
}

interface IDate {
    value: string;
    label: string;
}

@Component({
    selector: 'app-purchase-schedule',
    templateUrl: './purchase-schedule.component.html',
    styleUrls: ['./purchase-schedule.component.scss']
})
export class PurchaseScheduleComponent implements OnInit {
    public theaters: IMovieTheater[];
    public isLoading: boolean;
    public dateList: IDate[];
    public filmOrder: IFilmOrder[];
    public schedules: factory.chevre.event.screeningEvent.IEvent[];
    public conditions: { theater: string; date: string };
    public environment = environment;

    constructor(
        private error: ErrorService,
        private purchase: PurchaseService,
        private sasaki: SasakiService
    ) {
        this.theaters = [];
        this.dateList = [];
        this.filmOrder = [];
        this.conditions = {
            theater: '',
            date: ''
        };
    }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
        window.scrollTo(0, 0);
        this.isLoading = true;
        try {
            await this.sasaki.getServices();
            const searchResult = await this.sasaki.seller.search({});
            this.theaters = searchResult.data;
            this.dateList = this.getDateList(3);
            const theater = this.theaters[this.theaters.length - 1];
            if (theater.location === undefined
                || theater.location.branchCode === undefined) {
                throw new Error('branchCode is undefined');
            }
            this.conditions = {
                theater: theater.location.branchCode,
                date: this.dateList[0].value
            };
            await this.changeConditions();
        } catch (err) {
            this.error.redirect(err);
        }
        this.isLoading = false;
    }

    /**
     * @method getDateList
     * @param {number} loop
     * @returns {IDate[]}
     */
    public getDateList(loop: number): IDate[] {
        const results = [];
        for (let i = 0; i < loop; i++) {
            const date = moment().add(i, 'day');
            results.push({
                value: date.format('YYYYMMDD'),
                label: (i === 0) ? '本日' : (i === 1) ? '明日' : (i === 2) ? '明後日' : date.format('YYYY/MM/DD')
            });
        }

        return results;
    }

    /**
     * 条件変更
     * @method changeConditions
     * @returns {Promise<void>}
     */
    public async changeConditions(): Promise<void> {
        this.isLoading = true;
        this.filmOrder = [];
        try {
            await this.sasaki.getServices();
            const searchScreeningEventsResult = await this.sasaki.event.searchScreeningEvents({
                typeOf: factory.chevre.eventType.ScreeningEvent,
                superEvent: {
                    locationBranchCodes: [this.conditions.theater]
                },
                startFrom: moment(this.conditions.date).toDate(),
                startThrough: moment(this.conditions.date).add(1, 'day').toDate()
            });
            this.schedules = searchScreeningEventsResult.data;
            this.filmOrder = this.getEventFilmOrder();
            // console.log(this.filmOrder);
        } catch (err) {
            this.error.redirect(err);
        }
        this.isLoading = false;
    }

    /**
     * 作品別上映スケジュール取得
     * @function getScreeningEvents
     * @returns {IFilmOrder[]}
     */
    public getEventFilmOrder(): IFilmOrder[] {
        const results: IFilmOrder[] = [];
        this.schedules.forEach((screeningEvent) => {
            // 販売可能時間判定
            if (!this.purchase.isSalseTime(screeningEvent)) {
                return;
            }
            const film = results.find((event) => {
                return (event.id === screeningEvent.superEvent.id);
            });
            if (film === undefined) {
                results.push({
                    id: screeningEvent.superEvent.id,
                    films: [screeningEvent]
                });
            } else {
                film.films.push(screeningEvent);
            }
        });

        return results;
    }

}
