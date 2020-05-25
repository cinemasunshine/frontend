import { Component, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';

interface IFilmOrder {
    id: string;
    films: factory.chevre.event.screeningEvent.IEvent[];
}

@Component({
    selector: 'app-purchase-film-order',
    templateUrl: './purchase-film-order.component.html',
    styleUrls: ['./purchase-film-order.component.scss']
})
export class PurchaseFilmOrderComponent implements OnInit {
    @Input() public data: IFilmOrder;
    @Input() public member: boolean;
    public title: string;
    public duration: string;

    constructor() { }

    public ngOnInit() {
        const film = this.data.films[0];
        this.title = (film.name.ja === undefined) ? '' : film.name.ja;
        this.duration = (film.workPerformed === undefined
            || film.workPerformed.duration === undefined
            || film.workPerformed.duration === null)
            ? '' : film.workPerformed.duration;
    }

}
