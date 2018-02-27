import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ErrorService } from '../../../services/error/error.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss']
})
export class PurchaseConfirmComponent implements OnInit {
    public confirmForm: FormGroup;
    public isLoading: boolean;
    public disable: boolean;
    public environment = environment;

    constructor(
        public purchase: PurchaseService,
        private formBuilder: FormBuilder,
        private router: Router,
        private error: ErrorService
    ) { }

    public ngOnInit() {
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.confirmForm = this.formBuilder.group({
            notes: [false, [Validators.requiredTrue]]
        });
        this.disable = false;
    }

    public async onSubmit() {
        if (this.disable) {
            return;
        }
        if (this.confirmForm.invalid) {
            this.confirmForm.controls.notes.markAsDirty();

            return;
        }
        this.disable = true;
        this.isLoading = true;
        try {
            if (this.purchase.isExpired()) {
                this.router.navigate(['expired']);

                return;
            }
            await this.purchase.purchaseRegistrationProcess();
            this.router.navigate(['/purchase/complete']);
        } catch (err) {
            this.error.redirect(err);
        }
    }

}
