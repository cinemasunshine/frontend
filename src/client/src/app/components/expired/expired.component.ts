import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'app-expired',
    templateUrl: './expired.component.html',
    styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit {
    public environment = environment;
    constructor() { }

    public ngOnInit() {
    }

}
