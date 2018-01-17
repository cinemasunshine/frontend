import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { InquiryBaseComponent } from './components/inquiry/inquiry-base/inquiry-base.component';
import { InquiryConfirmComponent } from './components/inquiry/inquiry-confirm/inquiry-confirm.component';
import { InquiryLoginComponent } from './components/inquiry/inquiry-login/inquiry-login.component';
import { PurchaseBaseComponent } from './components/purchase/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/purchase/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/purchase/purchase-confirm/purchase-confirm.component';
import { PurchaseInputComponent } from './components/purchase/purchase-input/purchase-input.component';
import { PurchaseMvtkConfirmComponent } from './components/purchase/purchase-mvtk-confirm/purchase-mvtk-confirm.component';
import { PurchaseMvtkInputComponent } from './components/purchase/purchase-mvtk-input/purchase-mvtk-input.component';
import { PurchaseScheduleComponent } from './components/purchase/purchase-schedule/purchase-schedule.component';
import { PurchaseSeatComponent } from './components/purchase/purchase-seat/purchase-seat.component';
import { PurchaseTicketComponent } from './components/purchase/purchase-ticket/purchase-ticket.component';
import { PurchaseTransactionComponent } from './components/purchase/purchase-transaction/purchase-transaction.component';
import { PurchaseGuardService } from './services/purchase-guard/purchase-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'purchase/transaction', pathMatch: 'full' },
    { path: 'purchase/schedule', component: PurchaseScheduleComponent },
    { path: 'purchase/transaction', component: PurchaseTransactionComponent },
    {
        path: 'purchase',
        component: PurchaseBaseComponent,
        canActivate: [PurchaseGuardService],
        children: [
            { path: 'seat', component: PurchaseSeatComponent },
            { path: 'ticket', component: PurchaseTicketComponent },
            { path: 'input', component: PurchaseInputComponent },
            { path: 'confirm', component: PurchaseConfirmComponent },
            { path: 'complete', component: PurchaseCompleteComponent },
            { path: 'mvtk/input', component: PurchaseMvtkInputComponent },
            { path: 'mvtk/confirm', component: PurchaseMvtkConfirmComponent }
        ]
    },
    {
        path: 'inquiry',
        component: InquiryBaseComponent,
        canActivate: [PurchaseGuardService],
        children: [
            { path: 'login/:theater', component: InquiryLoginComponent },
            { path: 'confirm', component: InquiryConfirmComponent }
        ]
    },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
