import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-note',
    templateUrl: './purchase-note.component.html',
    styleUrls: ['./purchase-note.component.scss']
})
export class PurchaseNoteComponent implements OnInit {

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
            case '12':
                this.ordinance = '徳島県青少年健全育成条例';
                this.limit = '23:00';
                break;
            case '18':
                this.ordinance = '鹿児島県青少年保護育成条例';
                this.limit = '23:00';
                break;
            default:
                this.ordinance = '';
                this.limit = '';
                break;
        }
    }

}
