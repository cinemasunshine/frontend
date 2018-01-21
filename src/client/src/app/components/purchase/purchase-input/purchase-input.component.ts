import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-input',
    templateUrl: './purchase-input.component.html',
    styleUrls: ['./purchase-input.component.scss']
})
export class PurchaseInputComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
        window.scrollTo(0, 0);
    }

}
