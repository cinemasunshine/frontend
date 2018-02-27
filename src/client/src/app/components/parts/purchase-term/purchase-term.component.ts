import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-term',
    templateUrl: './purchase-term.component.html',
    styleUrls: ['./purchase-term.component.scss']
})
export class PurchaseTermComponent implements OnInit {
    @Input() public theaterCode: string;
    public ordinance: string;
    public limit: string;
    constructor() { }

    public ngOnInit() {
        switch (this.theaterCode) {
            case '01':
                this.ordinance = '東京都青少年健全育成条例';
                this.limit = '23:00';
                break;

            default:
                this.ordinance = '';
                this.limit = '';
                break;
        }
    }

}
