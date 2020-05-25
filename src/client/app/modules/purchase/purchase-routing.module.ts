import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberGuardService, PurchaseGuardService } from '../../guards';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { PurchaseBaseComponent } from './components/pages/purchase-base/purchase-base.component';
import { PurchaseCompleteComponent } from './components/pages/purchase-complete/purchase-complete.component';
import { PurchaseConfirmComponent } from './components/pages/purchase-confirm/purchase-confirm.component';
import { PurchaseInputComponent } from './components/pages/purchase-input/purchase-input.component';
import { PurchaseMgConfirmComponent } from './components/pages/purchase-mg-confirm/purchase-mg-confirm.component';
import { PurchaseMgInputComponent } from './components/pages/purchase-mg-input/purchase-mg-input.component';
import { PurchaseMvtkConfirmComponent } from './components/pages/purchase-mvtk-confirm/purchase-mvtk-confirm.component';
import { PurchaseMvtkInputComponent } from './components/pages/purchase-mvtk-input/purchase-mvtk-input.component';
import { PurchaseOverlapComponent } from './components/pages/purchase-overlap/purchase-overlap.component';
import { PurchasePointComponent } from './components/pages/purchase-point/purchase-point.component';
import { PurchaseScheduleComponent } from './components/pages/purchase-schedule/purchase-schedule.component';
import { PurchaseSeatComponent } from './components/pages/purchase-seat/purchase-seat.component';
import { PurchaseTicketComponent } from './components/pages/purchase-ticket/purchase-ticket.component';
import { PurchaseTransactionComponent } from './components/pages/purchase-transaction/purchase-transaction.component';


const routes: Routes = [
  { path: 'transaction', component: PurchaseTransactionComponent },
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'schedule', component: PurchaseScheduleComponent },
      { path: 'overlap', component: PurchaseOverlapComponent }
    ]
  },
  {
    path: '',
    component: PurchaseBaseComponent,
    canActivate: [PurchaseGuardService],
    children: [
      { path: 'seat', component: PurchaseSeatComponent },
      { path: 'ticket', component: PurchaseTicketComponent },
      { path: 'input', component: PurchaseInputComponent },
      { path: 'confirm', component: PurchaseConfirmComponent },
      { path: 'mvtk/input', component: PurchaseMvtkInputComponent },
      { path: 'mvtk/confirm', component: PurchaseMvtkConfirmComponent },
      { path: 'mg/input', component: PurchaseMgInputComponent },
      { path: 'mg/confirm', component: PurchaseMgConfirmComponent },
      { path: 'point', canActivate: [MemberGuardService], component: PurchasePointComponent }
    ]
  },
  {
    path: '',
    component: PurchaseBaseComponent,
    children: [
      { path: 'complete', component: PurchaseCompleteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
