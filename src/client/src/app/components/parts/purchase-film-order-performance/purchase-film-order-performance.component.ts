import { Component, Input, OnInit } from '@angular/core';
import * as sasaki from '@motionpicture/sskts-api-javascript-client';
import { HttpClient } from '../../../../../../../node_modules/@angular/common/http';
import { environment } from '../../../../environments/environment';

type IIndividualScreeningEvent = sasaki.factory.event.individualScreeningEvent.IEventWithOffer;
interface Iavailability {
    text: string;
    className: string;
}

@Component({
    selector: 'app-purchase-film-order-performance',
    templateUrl: './purchase-film-order-performance.component.html',
    styleUrls: ['./purchase-film-order-performance.component.scss']
})
export class PurchaseFilmOrderPerformanceComponent implements OnInit {
    @Input() public data: IIndividualScreeningEvent;
    public availability: Iavailability;

    constructor(
        private http: HttpClient
    ) { }

    public ngOnInit() {
        this.availability = this.getAvailability(this.data.offer.availability);
    }

    /**
     * @method getAvailability
     * @param {number | null} availability
     * @returns {Iavailability}
     */
    public getAvailability(availability: number | null): Iavailability {
        const availabilityList = [
            {
                text: '満席',
                className: 'vacancy-full'
            },
            {
                text: '残りわずか',
                className: 'vacancy-little'
            },
            {
                text: '空席あり',
                className: 'vacancy-large'
            }
        ];

        return (availability === 0 || availability === null)
            ? availabilityList[0] : (availability <= 10)
                ? availabilityList[1] : availabilityList[2];
    }

    /**
     * @method select
     */
    public async select() {
        const availability = this.data.offer.availability;
        if (availability === 0 || availability === null) {
            return;
        }
        // location.href = `${environment.ENTRANCE_SERVER_URL}/purchase/index.html?id=${this.data.identifier}`;
        const memberType = '1';
        const theaterCode = this.data.coaInfo.theaterCode;
        const performanceId = this.data.identifier;
        try {
            const passport = await this.http.post<{ token: string }>(`${environment.WAITER_ENDPOINT}/passports`, {
                scope: `placeOrderTransaction.MovieTheater-${theaterCode}`
            }).toPromise();
            const params = `performanceId=${performanceId}&passportToken=${passport.token}&member=${memberType}`;

            const url = `/purchase/transaction?${params}`;
            location.href = url;
            // console.log(url);
        } catch (err) {
            console.error(err);
        }

    }

}
