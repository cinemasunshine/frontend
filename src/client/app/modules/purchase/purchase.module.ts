import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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
import { PurchaseFilmOrderPerformanceComponent } from './components/parts/purchase-film-order-performance/purchase-film-order-performance.component';
import { PurchaseFilmOrderComponent } from './components/parts/purchase-film-order/purchase-film-order.component';
import { PurchaseNoteComponent } from './components/parts/purchase-note/purchase-note.component';
import { PurchaseStepComponent } from './components/parts/purchase-step/purchase-step.component';
import { PurchaseTermComponent } from './components/parts/purchase-term/purchase-term.component';
import { SeatInfoComponent } from './components/parts/seat-info/seat-info.component';
import { PurchaseRoutingModule } from './purchase-routing.module';


@NgModule({
  declarations: [
    PurchaseBaseComponent,
    PurchaseCompleteComponent,
    PurchaseConfirmComponent,
    PurchaseInputComponent,
    PurchaseMvtkConfirmComponent,
    PurchaseMvtkInputComponent,
    PurchaseOverlapComponent,
    PurchasePointComponent,
    PurchaseScheduleComponent,
    PurchaseSeatComponent,
    PurchaseTicketComponent,
    PurchaseTransactionComponent,
    PurchaseFilmOrderComponent,
    PurchaseFilmOrderPerformanceComponent,
    PurchaseNoteComponent,
    PurchaseStepComponent,
    PurchaseTermComponent,
    SeatInfoComponent,
    PurchaseMgInputComponent,
    PurchaseMgConfirmComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
  ],
  exports: []
})
export class PurchaseModule { }
