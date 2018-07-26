import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mocoin-signout',
    templateUrl: './mocoin-signout.component.html',
    styleUrls: ['./mocoin-signout.component.scss']
})
export class MocoinSignoutComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    public ngOnInit() {
        this.router.navigate(['/purchase/mocoin/input']);
    }

}
