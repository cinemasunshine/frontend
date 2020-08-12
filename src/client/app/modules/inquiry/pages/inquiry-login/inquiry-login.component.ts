import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as libphonenumber from 'libphonenumber-js';
import { ErrorService, InquiryService } from '../../../../services';

@Component({
    selector: 'app-inquiry-login',
    templateUrl: './inquiry-login.component.html',
    styleUrls: ['./inquiry-login.component.scss']
})
export class InquiryLoginComponent implements OnInit {
    public isLoading: boolean;
    public inquiryForm: FormGroup;
    public theaterCode: string;
    public seller: factory.chevre.seller.ISeller;
    public inquiryErrorModal: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private inquiryService: InquiryService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private errorService: ErrorService
    ) { }

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.inquiryService.reset();
        this.isLoading = true;
        this.inquiryErrorModal = false;
        this.createInquiryForm();
        const snapshot = this.activatedRoute.snapshot;
        const confirmationNumber = snapshot.params.confirmationNumber;
        const theaterCode = snapshot.params.theaterCode;
        if (confirmationNumber !== undefined) {
            this.inquiryForm.controls.confirmationNumber.setValue(confirmationNumber);
        }
        try {
            const sellers = (await this.inquiryService.searchSeller(theaterCode)).data;
            if (sellers.length === 0) {
                throw new Error('seller notfound');
            }
            this.seller = sellers[0];
            this.isLoading = false;
        } catch (error) {
            this.errorService.redirect(error);
        }
    }

    /**
     * 照会フォーム作成
     */
    private createInquiryForm() {
        const TEL_MAX_LENGTH = 15;
        const TEL_MIN_LENGTH = 9;
        this.inquiryForm = this.formBuilder.group({
            confirmationNumber: ['', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ]],
            telephone: ['', [
                Validators.required,
                Validators.maxLength(TEL_MAX_LENGTH),
                Validators.minLength(TEL_MIN_LENGTH),
                (control: AbstractControl): ValidationErrors | null => {
                    const field = control.root.get('telephone');
                    if (field !== null) {
                        if (field.value === '') {
                            return null;
                        }
                        const parsedNumber = (new RegExp(/^\+/).test(field.value))
                            ? libphonenumber.parse(field.value)
                            : libphonenumber.parse(field.value, 'JP');
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
            ]]
        });
    }

    /**
     * 照会
     */
    public async onSubmit() {
        Object.keys(this.inquiryForm.controls).forEach((key) => {
            this.inquiryForm.controls[key].markAsTouched();
        });
        this.inquiryForm.controls.confirmationNumber.setValue((<HTMLInputElement>document.getElementById('confirmationNumber')).value);
        this.inquiryForm.controls.telephone.setValue((<HTMLInputElement>document.getElementById('telephone')).value);
        if (this.inquiryForm.invalid) {
            return;
        }
        const confirmationNumber = Number(this.inquiryForm.controls.confirmationNumber.value);
        const telephone = this.inquiryForm.controls.telephone.value;
        const theaterCode = (this.seller.location === undefined || this.seller.location.branchCode === undefined)
            ? '' : this.seller.location.branchCode;
        try {
            this.isLoading = true;
            const order = await this.inquiryService.findByOrderInquiryKey({
                confirmationNumber, telephone, theaterCode
            });
            this.inquiryService.data.order = order;
            this.inquiryService.data.seller = this.seller;
            this.inquiryService.save();
            this.router.navigate(['/inquiry/confirm']);
        } catch (error) {
            this.isLoading = false;
            this.inquiryErrorModal = true;
            console.error(error);
        }
    }

}

