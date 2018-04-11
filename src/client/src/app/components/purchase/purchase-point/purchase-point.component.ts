import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-point',
    templateUrl: './purchase-point.component.html',
    styleUrls: ['./purchase-point.component.scss']
})
export class PurchasePointComponent implements OnInit {

    public isLoading: boolean;

    constructor() { }

    public ngOnInit() {
        this.isLoading = false;
    }

    public onSubmit() {

    }

}
