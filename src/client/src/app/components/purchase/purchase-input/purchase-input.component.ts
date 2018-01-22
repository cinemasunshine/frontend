import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-input',
    templateUrl: './purchase-input.component.html',
    styleUrls: ['./purchase-input.component.scss']
})
export class PurchaseInputComponent implements OnInit {
    public cardExpiration: {
        year: string[];
        month: string[];
    };
    public inputForm: FormGroup;
    public isLoading: boolean;

    constructor(
        private purchase: PurchaseService,
        private formBuilder: FormBuilder,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.cardExpiration = {
            year: [],
            month: []
        };
        this.inputForm = this.createForm();
        console.log(this.inputForm);
    }

    /**
     * 次へ
     * @method onSubmit
     */
    public async onSubmit() {
        this.isLoading = true;
        try {
            this.purchase.save();
            this.router.navigate(['/purchase/confirm']);
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        const payment = 1000;
        const customerContact = {
            familyName: '',
            givenName: '',
            email: '',
            emailConfirm: '',
            telephone: '',
            cardNumber: '',
            cardExpirationMonth: '01',
            cardExpirationYear: moment().format('YYYY'),
            securityCode: '',
            holderName: ''
        };
        if (this.purchase.data.customerContact !== undefined) {
            // 購入者情報入力済み
            customerContact.familyName = this.purchase.data.customerContact.familyName;
            customerContact.givenName = this.purchase.data.customerContact.givenName;
            customerContact.email = this.purchase.data.customerContact.email;
            customerContact.emailConfirm = this.purchase.data.customerContact.email;
            customerContact.telephone = this.purchase.data.customerContact.telephone;
        }
        if (payment > 0) {
            for (let i = 0; i < 12; i++) {
                const DIGITS = -2;
                this.cardExpiration.month.push(`0${String(i + 1)}`.slice(DIGITS));
            }
            for (let i = 0; i < 10; i++) {
                this.cardExpiration.year.push(moment().add(i, 'year').format('YYYY'));
            }
            // 決済あり
            return this.formBuilder.group({
                familyName: [customerContact.familyName, [Validators.required]],
                givenName: [customerContact.givenName, [Validators.required]],
                email: [customerContact.email, [Validators.required]],
                emailConfirm: [customerContact.emailConfirm, [Validators.required]],
                telephone: [customerContact.telephone, [Validators.required]],
                cardNumber: [customerContact.cardNumber, [Validators.required]],
                cardExpirationMonth: [customerContact.cardExpirationMonth, [Validators.required]],
                cardExpirationYear: [customerContact.cardExpirationYear, [Validators.required]],
                securityCode: [customerContact.securityCode, [Validators.required]],
                holderName: [customerContact.holderName, [Validators.required]]
            });
        } else {
            // 決済なし
            return this.formBuilder.group({
                familyName: [customerContact.familyName, [Validators.required]],
                givenName: [customerContact.givenName, [Validators.required]],
                email: [customerContact.email, [Validators.required]],
                emailConfirm: [customerContact.emailConfirm, [Validators.required]],
                telephone: [customerContact.telephone, [Validators.required]]
            });
        }
    }

}
