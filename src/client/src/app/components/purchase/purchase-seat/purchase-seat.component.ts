import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-purchase-seat',
    templateUrl: './purchase-seat.component.html',
    styleUrls: ['./purchase-seat.component.scss']
})
export class PurchaseSeatComponent implements OnInit {
    public seatForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        console.log(this.router);
        this.seatForm = this.formBuilder.group({
            terms: this.formBuilder.control({}),
            seats: this.formBuilder.array([])
        });
    }

}
