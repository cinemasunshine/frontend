import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ErrorComponent } from './components/error/error.component';
import { InquiryBaseComponent } from './components/inquiry/inquiry-base/inquiry-base.component';
import { InquiryConfirmComponent } from './components/inquiry/inquiry-confirm/inquiry-confirm.component';
import { InquiryLoginComponent } from './components/inquiry/inquiry-login/inquiry-login.component';
import { ButtonsComponent } from './components/parts/buttons/buttons.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { IconComponent } from './components/parts/icon/icon.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { ModalComponent } from './components/parts/modal/modal.component';
import {
  PurchaseFilmOrderPerformanceComponent
} from './components/parts/purchase-film-order-performance/purchase-film-order-performance.component';
import { PurchaseFilmOrderComponent } from './components/parts/purchase-film-order/purchase-film-order.component';
import { PurchaseNotesComponent } from './components/parts/purchase-notes/purchase-notes.component';
import { PurchaseStepComponent } from './components/parts/purchase-step/purchase-step.component';
import { PurchaseTermsComponent } from './components/parts/purchase-terms/purchase-terms.component';
import { ScreenComponent } from './components/parts/screen/screen.component';
import { SeatInfoComponent } from './components/parts/seat-info/seat-info.component';
import { SiteSealComponent } from './components/parts/site-seal/site-seal.component';
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
import { DurationPipe } from './pipes/duration/duration.pipe';
import { TimeFormatPipe } from './pipes/time-format/time-format.pipe';
import { ErrorService } from './services/error/error.service';
import { PurchaseGuardService } from './services/purchase-guard/purchase-guard.service';
import { PurchaseService } from './services/purchase/purchase.service';
import { SasakiInquiryService } from './services/sasaki/sasaki-inquiry/sasaki-inquiry.service';
import { SasakiMasterService } from './services/sasaki/sasaki-master/sasaki-master.service';
import { SasakiPurchaseService } from './services/sasaki/sasaki-purchase/sasaki-purchase.service';
import { StorageService } from './services/storage/storage.service';
import { LibphonenumberFormatPipe } from './pipes/libphonenumber-format/libphonenumber-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseBaseComponent,
    PurchaseCompleteComponent,
    PurchaseScheduleComponent,
    PurchaseSeatComponent,
    PurchaseTicketComponent,
    PurchaseInputComponent,
    PurchaseConfirmComponent,
    PurchaseMvtkInputComponent,
    PurchaseMvtkConfirmComponent,
    InquiryBaseComponent,
    InquiryLoginComponent,
    InquiryConfirmComponent,
    ScreenComponent,
    HeaderComponent,
    FooterComponent,
    PurchaseStepComponent,
    LoadingComponent,
    SiteSealComponent,
    ModalComponent,
    ButtonsComponent,
    PurchaseNotesComponent,
    PurchaseTermsComponent,
    PurchaseTransactionComponent,
    ErrorComponent,
    PurchaseFilmOrderComponent,
    PurchaseFilmOrderPerformanceComponent,
    TimeFormatPipe,
    DurationPipe,
    SeatInfoComponent,
    IconComponent,
    LibphonenumberFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PurchaseGuardService,
    SasakiInquiryService,
    SasakiMasterService,
    SasakiPurchaseService,
    ErrorService,
    StorageService,
    PurchaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
