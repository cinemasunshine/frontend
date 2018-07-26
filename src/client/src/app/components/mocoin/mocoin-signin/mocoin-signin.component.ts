import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@mocoin/api-javascript-client';
import { MocoinService } from '../../../services/mocoin/mocoin.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'app-mocoin-signin',
    templateUrl: './mocoin-signin.component.html',
    styleUrls: ['./mocoin-signin.component.scss']
})
export class MocoinSigninComponent implements OnInit {

    constructor(
        private router: Router,
        private user: UserService,
        private mocoin: MocoinService
    ) { }

    public async ngOnInit() {
        try {
            await this.mocoin.getServices();
            const coinAccounts = await this.mocoin.person.searchCoinAccounts({
                personId: 'me'
            });
            const openCoinAccount = coinAccounts.filter((account) => {
                return (account.status === factory.pecorino.accountStatusType.Opened);
            });
            if (openCoinAccount.length === 0) {
                throw new Error('coin account not found');
            }
            this.user.data.coinAccount = openCoinAccount[0];
            this.user.data.mocoinAccessToken = this.mocoin.auth.credentials.accessToken;
            this.user.save();
            await this.mocoin.signOut();
        } catch (err) {
            console.error(err);
            this.router.navigate(['/error']);
        }
    }

}
