import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    public securityCodeModal: boolean;

    constructor(
        public purchase: PurchaseService,
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
        if (this.inputForm.invalid) {

            return;
        }
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
        const NAME_MAX_LENGTH = 12;
        const MAIL_MAX_LENGTH = 50;
        const TEL_MAX_LENGTH = 11;
        const TEL_MIN_LENGTH = 9;
        const customerContact = {
            familyName: {
                value: '',
                validators: [
                    Validators.required,
                    Validators.maxLength(NAME_MAX_LENGTH),
                    Validators.pattern(/^[ぁ-ゞー]+$/)
                ]
            },
            givenName: {
                value: '',
                validators: [
                    Validators.required,
                    Validators.maxLength(NAME_MAX_LENGTH),
                    Validators.pattern(/^[ぁ-ゞー]+$/)
                ]
            },
            email: {
                value: '', validators: [
                    Validators.required,
                    Validators.maxLength(MAIL_MAX_LENGTH),
                    Validators.email
                ]
            },
            emailConfirm: {
                value: '', validators: [
                    Validators.required,
                    Validators.maxLength(MAIL_MAX_LENGTH),
                    Validators.email,
                    (control: AbstractControl): ValidationErrors | null => {
                        const field = control.root.get('email');
                        if (field !== null) {
                            if (control.value !== field.value) {
                                return { equals: true };
                            }
                        }
                        return null;
                    }
                ]
            },
            telephone: {
                value: '', validators: [
                    Validators.required,
                    Validators.maxLength(TEL_MAX_LENGTH),
                    Validators.minLength(TEL_MIN_LENGTH),
                    Validators.pattern(/^[0-9]+$/)
                ]
            },
            cardNumber: { value: '', validators: [Validators.required] },
            cardExpirationMonth: { value: '01', validators: [Validators.required] },
            cardExpirationYear: { value: moment().format('YYYY'), validators: [Validators.required] },
            securityCode: { value: '', validators: [Validators.required] },
            holderName: { value: '', validators: [Validators.required] },
        };
        if (this.purchase.data.customerContact !== undefined) {
            // 購入者情報入力済み
            customerContact.familyName.value = this.purchase.data.customerContact.familyName;
            customerContact.givenName.value = this.purchase.data.customerContact.givenName;
            customerContact.email.value = this.purchase.data.customerContact.email;
            customerContact.emailConfirm.value = this.purchase.data.customerContact.email;
            customerContact.telephone.value = this.purchase.data.customerContact.telephone;
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
                familyName: [customerContact.familyName.value, customerContact.familyName.validators],
                givenName: [customerContact.givenName.value, customerContact.givenName.validators,],
                email: [customerContact.email.value, customerContact.email.validators],
                emailConfirm: [customerContact.emailConfirm.value, customerContact.emailConfirm.validators],
                telephone: [customerContact.telephone.value, customerContact.telephone.validators],
                cardNumber: [customerContact.cardNumber.value, customerContact.cardNumber.validators],
                cardExpirationMonth: [customerContact.cardExpirationMonth.value, customerContact.cardExpirationMonth.validators],
                cardExpirationYear: [customerContact.cardExpirationYear.value, customerContact.cardExpirationYear.validators],
                securityCode: [customerContact.securityCode.value, customerContact.securityCode.validators],
                holderName: [customerContact.holderName.value, customerContact.holderName.validators]
            });
        } else {
            // 決済なし
            return this.formBuilder.group({
                familyName: [customerContact.familyName.value, customerContact.familyName.validators],
                givenName: [customerContact.givenName.value, customerContact.givenName.validators,],
                email: [customerContact.email.value, customerContact.email.validators],
                emailConfirm: [customerContact.emailConfirm.value, customerContact.emailConfirm.validators],
                telephone: [customerContact.telephone.value, customerContact.telephone.validators]
            });
        }
    }

}
