import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-mocoin-input',
    templateUrl: './mocoin-input.component.html',
    styleUrls: ['./mocoin-input.component.scss']
})
export class MocoinInputComponent implements OnInit {

    public usePoint: number;
    public disable: boolean;
    public availableBalance: number;
    public isLoading: boolean;
    public alertModal: boolean;
    public errorMessage: string;

    constructor(
        private user: UserService,
        private purchase: PurchaseService,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.usePoint = this.purchase.data.useMocoin;
        this.disable = false;
        this.alertModal = false;
        this.errorMessage = '';
        this.isLoading = true;
        try {
            if (this.user.data.coinAccount === undefined) {
                throw new Error('coinAccount not found');
            }
            this.availableBalance = this.user.data.coinAccount.availableBalance;
        } catch (err) {
            this.router.navigate(['/error']);
            return;
        }
        this.isLoading = false;
    }

    public async onSubmit() {
        if (this.disable) {
            return;
        }
        this.errorMessage = '';
        if (!<any>this.usePoint) {
            this.usePoint = 0;
        }
        if (this.usePoint === 0) {
            this.errorMessage = '使用するポイントは0以上を入力してください。';
        }
        if (this.usePoint > this.availableBalance) {
            this.errorMessage = '使用できるポイントの上限を超えています。';
        }
        if (this.usePoint > this.purchase.getTotalSalsePrice()) {
            this.errorMessage = '決済金額の上限を超えています。';
        }
        if (this.errorMessage !== '') {
            this.alertModal = true;
            return;
        }
        this.isLoading = true;
        this.disable = true;

        this.purchase.data.useMocoin = this.usePoint;
        this.purchase.save();
        this.router.navigate(['/purchase/input']);
    }

}
