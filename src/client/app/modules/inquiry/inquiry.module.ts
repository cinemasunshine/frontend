import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryBaseComponent } from './pages/inquiry-base/inquiry-base.component';
import { InquiryConfirmComponent } from './pages/inquiry-confirm/inquiry-confirm.component';
import { InquiryLoginComponent } from './pages/inquiry-login/inquiry-login.component';

@NgModule({
  declarations: [
    InquiryBaseComponent,
    InquiryLoginComponent,
    InquiryConfirmComponent
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    SharedModule,
  ]
})
export class InquiryModule { }
