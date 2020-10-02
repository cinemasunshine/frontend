import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { PurchaseService } from '../../../../../services';

@Component({
    selector: 'app-purchase-mg-input',
    templateUrl: './purchase-mg-input.component.html',
    styleUrls: ['./purchase-mg-input.component.scss']
})
export class PurchaseMgInputComponent implements OnInit {
    public forms: FormGroup[];
    public inputForm: FormGroup;
    public inputValidationModal: boolean;
    public authErrorModal: boolean;
    public isLoading: boolean;

    constructor(
        public purchase: PurchaseService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.inputValidationModal = false;
        this.authErrorModal = false;
        this.forms = [];
        this.forms.push(this.createForm());
        this.inputForm = this.formBuilder.group({});
    }

    /**
     * フォーム作成
     * @method createForm
     */
    private createForm() {
        // const CODE_LENGTH = 10;
        // const PASSWORD_LENGTH = 4;
        return this.formBuilder.group({
            code: ['', [
                Validators.required,
                // Validators.maxLength(CODE_LENGTH),
                // Validators.minLength(CODE_LENGTH),
                Validators.pattern(/^[0-9a-zA-Z]+$/)
            ]],
            password: ['', [
                Validators.required,
                // Validators.maxLength(PASSWORD_LENGTH),
                // Validators.minLength(PASSWORD_LENGTH),
                Validators.pattern(/^[0-9]+$/)
            ]]
        });
    }

    /**
     * 外部チケット追加
     * @method addTicket
     */
    public addTicket() {
        this.forms.push(this.createForm());
    }

    /**
     * 外部チケット削除
     * @method removeTicket
     */
    public removeTicket(index: number) {
        this.forms.splice(index, 1);
    }

    /**
     * 外部チケット認証
     */
    public async onSubmit() {
        this.forms.forEach((mvtkForm, index) => {
            const mvtkCodeList = document.querySelectorAll('.mvtk-code');
            const value = (<HTMLInputElement>mvtkCodeList[index]).value;
            mvtkForm.controls.code.setValue(value);
        });
        const forms = this.forms.filter((group) => {
            return (!group.invalid);
        });
        if (forms.length !== this.forms.length) {
            this.inputValidationModal = true;

            return;
        }
        this.isLoading = true;
        if (this.purchase.isExpired()) {
            this.router.navigate(['/expired']);

            return;
        }
        try {
            const paymentMethodType = factory.chevre.paymentMethodType.MGTicket;
            const inputDataList = forms.map((mvtkForm) => {
                return {
                    knyknrNo: mvtkForm.controls.code.value,
                    pinCd: mvtkForm.controls.password.value
                };
            });
            await this.purchase.movieTicketAuthenticationProcess({ paymentMethodType, inputDataList });
            this.router.navigate(['purchase/mg/confirm']);
        } catch (err) {
            console.error(err);
            this.isLoading = false;
            this.authErrorModal = true;
        }
    }

}
