import { Component, Input, OnInit } from '@angular/core';

const PURCHASE_TERM = {
    '01': { ordinance: '東京都青少年健全育成条例', limit: '23:00' },
    '02': { ordinance: '東京都青少年健全育成条例', limit: '23:00' },
    '06': { ordinance: '静岡県青少年健全育成条例', limit: '23:00' },
    '07': { ordinance: '愛媛県青少年健全育成条例', limit: '23:00' },
    '08': { ordinance: '愛媛県青少年健全育成条例', limit: '23:00' },
    '09': { ordinance: '愛媛県青少年健全育成条例', limit: '23:00' },
    '10': { ordinance: '愛媛県青少年健全育成条例', limit: '23:00' },
    '12': { ordinance: '徳島県青少年健全育成条例', limit: '23:00' },
    '13': { ordinance: '茨城県青少年健全育成条例', limit: '23:00' },
    '14': { ordinance: '石川県青少年健全育成条例', limit: '23:00' },
    '15': { ordinance: '愛媛県青少年健全育成条例', limit: '23:00' },
    '16': { ordinance: '奈良県青少年健全育成条例', limit: '23:00' },
    '17': { ordinance: '山口県青少年健全育成条例', limit: '23:00' },
    '18': { ordinance: '鹿児島県青少年保護育成条例', limit: '23:00' },
    '19': { ordinance: '千葉県青少年健全育成条例', limit: '23:00' },
    '20': { ordinance: '東京都青少年健全育成条例', limit: '23:00' },
    '21': { ordinance: '静岡県青少年健全育成条例', limit: '23:00' }
};

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
        this.ordinance = '';
        this.limit = '';
        if ((<any>PURCHASE_TERM)[this.theaterCode] !== undefined) {
            this.ordinance = (<any>PURCHASE_TERM)[this.theaterCode].ordinance;
            this.limit = (<any>PURCHASE_TERM)[this.theaterCode].limit;
        }
    }

}
