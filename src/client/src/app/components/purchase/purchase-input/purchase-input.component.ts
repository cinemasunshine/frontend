import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as libphonenumber from 'libphonenumber-js';
import * as moment from 'moment';
import { LibphonenumberFormatPipe } from '../../../pipes/libphonenumber-format/libphonenumber-format.pipe';
import { AwsCognitoService } from '../../../services/aws-cognito/aws-cognito.service';
import { ErrorService } from '../../../services/error/error.service';
import { IGmoTokenObject, PurchaseService } from '../../../services/purchase/purchase.service';
import { UserService } from '../../../services/user/user.service';

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
    public creditCardAlertModal: boolean;
    public disable: boolean;

    constructor(
        public purchase: PurchaseService,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
        private router: Router,
        private error: ErrorService,
        private awsCognito: AwsCognitoService,
        private user: UserService
    ) { }

    public async ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.cardExpiration = {
            year: [],
            month: []
        };
        this.inputForm = this.createForm();
        this.disable = false;
        if (this.user.isNative() && !this.user.isMember()) {
            // アプリ非会員ならCognitoから取得
            const records = await this.awsCognito.getRecords({
                datasetName: 'profile'
            });
            if (records.familyName !== undefined
                || records.givenName !== undefined
                || records.email !== undefined
                || records.emailConfirm !== undefined
                || records.telephone !== undefined) {
                this.inputForm.controls.familyName.setValue(records.familyName);
                this.inputForm.controls.givenName.setValue(records.givenName);
                this.inputForm.controls.email.setValue(records.email);
                this.inputForm.controls.emailConfirm.setValue(records.email);
                this.inputForm.controls.telephone.setValue(records.telephone);
            }
        }
    }

    /**
     * 次へ
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.disable) {
            return;
        }
        if (this.inputForm.invalid) {
            this.inputForm.controls.familyName.markAsTouched();
            this.inputForm.controls.givenName.markAsTouched();
            this.inputForm.controls.email.markAsTouched();
            this.inputForm.controls.emailConfirm.markAsTouched();
            this.inputForm.controls.telephone.markAsTouched();
            if (this.purchase.getTotalPrice() > 0) {
                this.inputForm.controls.cardNumber.markAsTouched();
                this.inputForm.controls.cardExpirationMonth.markAsTouched();
                this.inputForm.controls.cardExpirationYear.markAsTouched();
                this.inputForm.controls.securityCode.markAsTouched();
                this.inputForm.controls.holderName.markAsTouched();
            }
            setTimeout(() => {
                const element: HTMLElement = this.elementRef.nativeElement;
                const validation = <HTMLElement>element.querySelector('.validation');
                if (validation === null) {
                    return;
                }
                const rect = validation.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const top = rect.top + scrollTop - 50;
                window.scrollTo(undefined, top);
            }, 0);

            return;
        }
        this.disable = true;
        this.isLoading = true;
        try {
            if (this.purchase.data.transaction === undefined) {
                throw new Error('status is different');
            }
            if (this.purchase.getTotalPrice() > 0) {
                try {
                    this.purchase.data.gmoTokenObject = await this.getGmoObject();
                    // クレジットカード処理
                    await this.purchase.creditCardPaymentProcess((<IGmoTokenObject>this.purchase.data.gmoTokenObject).token);
                } catch (err) {
                    console.error(err);
                    // クレジットカード処理失敗
                    this.isLoading = false;
                    this.creditCardAlertModal = true;
                    this.inputForm.controls.cardNumber.setValue('');
                    this.inputForm.controls.securityCode.setValue('');
                    this.inputForm.controls.holderName.setValue('');
                    this.disable = false;

                    return;
                }
            }
            // 入力情報を登録
            const setCustomerContactArgs = {
                transactionId: this.purchase.data.transaction.id,
                contact: {
                    familyName: this.inputForm.controls.familyName.value,
                    givenName: this.inputForm.controls.givenName.value,
                    email: this.inputForm.controls.email.value,
                    telephone: this.inputForm.controls.telephone.value
                }
            };
            if (this.purchase.isExpired()) {
                this.router.navigate(['expired']);

                return;
            }
            await this.purchase.customerContactRegistrationProcess(setCustomerContactArgs);
            this.router.navigate(['/purchase/confirm']);
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * GMOトークン取得
     * @method getGmoToken
     */
    private async getGmoObject(): Promise<IGmoTokenObject> {
        const sendParam = {
            cardno: this.inputForm.controls.cardNumber.value,
            expire: this.inputForm.controls.cardExpirationYear.value + this.inputForm.controls.cardExpirationMonth.value,
            securitycode: this.inputForm.controls.securityCode.value,
            holdername: this.inputForm.controls.holderName.value
        };
        console.log(sendParam);
        return new Promise<IGmoTokenObject>((resolve, reject) => {
            if (this.purchase.data.movieTheaterOrganization === undefined) {
                return reject(new Error('status is different'));
            }
            (<any>window).someCallbackFunction = function someCallbackFunction(response: any) {
                if (response.resultCode === '000') {
                    resolve(response.tokenObject);
                } else {
                    reject(new Error(response.resultCode));
                }
            };
            const Multipayment = (<any>window).Multipayment;
            Multipayment.init(this.purchase.data.movieTheaterOrganization.gmoInfo.shopId);
            Multipayment.getToken(sendParam, (<any>window).someCallbackFunction);
        });
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        const payment = this.purchase.getTotalPrice();
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
                    Validators.pattern(/^[0-9]+$/),
                    (control: AbstractControl): ValidationErrors | null => {
                        const field = control.root.get('telephone');
                        if (field !== null) {
                            const parsedNumber = libphonenumber.parse(field.value, 'JP');
                            if (parsedNumber.phone === undefined) {
                                return { telephone: true };
                            }
                            const isValid = libphonenumber.isValidNumber(parsedNumber);
                            if (!isValid) {
                                return { telephone: true };
                            }
                        }

                        return null;
                    }
                ]
            },
            cardNumber: { value: '', validators: [Validators.required] },
            cardExpirationMonth: { value: '01', validators: [Validators.required] },
            cardExpirationYear: { value: moment().format('YYYY'), validators: [Validators.required] },
            securityCode: { value: '', validators: [Validators.required] },
            holderName: { value: '', validators: [Validators.required] }
        };

        if (this.purchase.data.customerContact !== undefined) {
            // 購入者情報入力済み
            customerContact.familyName.value = this.purchase.data.customerContact.familyName;
            customerContact.givenName.value = this.purchase.data.customerContact.givenName;
            customerContact.email.value = this.purchase.data.customerContact.email;
            customerContact.emailConfirm.value = this.purchase.data.customerContact.email;
            customerContact.telephone.value =
                new LibphonenumberFormatPipe().transform(this.purchase.data.customerContact.telephone);
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
                givenName: [customerContact.givenName.value, customerContact.givenName.validators],
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
                givenName: [customerContact.givenName.value, customerContact.givenName.validators],
                email: [customerContact.email.value, customerContact.email.validators],
                emailConfirm: [customerContact.emailConfirm.value, customerContact.emailConfirm.validators],
                telephone: [customerContact.telephone.value, customerContact.telephone.validators]
            });
        }
    }

}
