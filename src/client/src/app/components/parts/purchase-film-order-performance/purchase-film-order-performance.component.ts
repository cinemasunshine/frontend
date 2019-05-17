import { Component, Input, OnInit } from '@angular/core';
import { factory } from '../../../../../../../node_modules/@motionpicture/sskts-api-javascript-client';
import { environment } from '../../../../environments/environment';

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
    @Input() public data: factory.chevre.event.screeningEvent.IEvent;
    public availability: Iavailability;

    constructor() { }

    public ngOnInit() {
        const availability = (this.data.offers === undefined) ? undefined : this.data.offers.availability;
        this.availability = this.getAvailability(availability);
    }

    /**
     * @method getAvailability
     * @param {number | null} availability
     * @returns {Iavailability}
     */
    public getAvailability(availability?: number | factory.chevre.itemAvailability): Iavailability {
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

        return (availability === 0 || availability === undefined)
            ? availabilityList[0] : (availability <= 10)
                ? availabilityList[1] : availabilityList[2];
    }

    /**
     * @method start
     * @returns {void}
     */
    public start(): void {
        const availability = (this.data.offers === undefined) ? undefined : this.data.offers.availability;
        if (availability === 0 || availability === undefined) {
            return;
        }
        location.href = `${environment.ENTRANCE_SERVER_URL}/purchase/index.html?id=${this.data.identifier}`;
    }

}
