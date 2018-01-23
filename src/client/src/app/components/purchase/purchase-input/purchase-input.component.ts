import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as GMO from '@motionpicture/gmo-service';
// import { PhoneNumberUtil } from 'google-libphonenumber';
import * as moment from 'moment';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SasakiPurchaseService } from '../../../services/sasaki/sasaki-purchase/sasaki-purchase.service';

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
    public gmoToken: string;

    constructor(
        public purchase: PurchaseService,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
        private router: Router,
        private sasakiPurchase: SasakiPurchaseService,
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
            const element: HTMLElement = this.elementRef.nativeElement;
            const validation = <HTMLElement>element.querySelector('.validation');
            const rect = validation.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const top = rect.top + scrollTop - 50;
            window.scrollTo(undefined, top);

            return;
        }
        this.isLoading = true;
        try {
            if (this.purchase.data.transaction === undefined) {
                throw new Error('status is different');
            }
            try {
                // クレジットカード処理
                await this.creditCardProcess();
            } catch (err) {
                // クレジットカード処理失敗
                this.isLoading = false;
                this.creditCardAlertModal = true;
                this.inputForm.controls.cardNumber.setValue('');
                this.inputForm.controls.securityCode.setValue('');
                this.inputForm.controls.holderName.setValue('');

                return;
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
            this.purchase.data.customerContact = await this.sasakiPurchase.setCustomerContact(setCustomerContactArgs);
            this.purchase.save();
            this.router.navigate(['/purchase/confirm']);
        } catch (err) {
            this.error.redirect(err);
        }
    }

    /**
     * クレジットカード処理
     * @method creditCardProcess
     */
    private async creditCardProcess() {
        if (this.purchase.data.transaction === undefined) {
            throw new Error('status is different');
        }
        if (this.purchase.data.creditCardAuthorization !== undefined) {
            // クレジットカード登録済みなら削除
            const cancelCreditCardAuthorizationArgs = {
                transactionId: this.purchase.data.transaction.id,
                actionId: this.purchase.data.creditCardAuthorization.id
            };
            await this.sasakiPurchase.cancelCreditCardAuthorization(cancelCreditCardAuthorizationArgs);
            this.purchase.data.creditCardAuthorization = undefined;
            this.purchase.save();
        }
        // クレジットカード登録
        const creditCard = {
            token: this.gmoToken
        };
        const createCreditCardAuthorizationArgs = {
            transactionId: this.purchase.data.transaction.id,
            orderId: (<string>this.purchase.data.orderId),
            amount: this.purchase.getTotalPrice(),
            method: GMO.utils.util.Method.Lump,
            creditCard: creditCard
        };
        this.purchase.data.creditCardAuthorization =
            await this.sasakiPurchase.createCreditCardAuthorization(createCreditCardAuthorizationArgs);
    }

    /**
     * GMOトークン取得
     * @method getGmoToken
     */
    private async getGmoToken() {

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
                    (control: AbstractControl): ValidationErrors | null => {
                        // const value = (<AbstractControl>control.root.get('telephone')).value;
                        // const phoneUtil = PhoneNumberUtil.getInstance();
                        // const phoneNumber = phoneUtil.parse(value, 'JP'); // 日本以外は非対応
                        // if (!phoneUtil.isValidNumber(phoneNumber)) {
                        //     return { telephone: true };
                        // }

                        return null;
                    }
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
