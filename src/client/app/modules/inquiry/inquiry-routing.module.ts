import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryBaseComponent } from './pages/inquiry-base/inquiry-base.component';
import { InquiryConfirmComponent } from './pages/inquiry-confirm/inquiry-confirm.component';
import { InquiryLoginComponent } from './pages/inquiry-login/inquiry-login.component';


const routes: Routes = [
  {
    path: '',
    component: InquiryBaseComponent,
    children: [
      { path: ':theaterCode/:confirmationNumber/login', component: InquiryLoginComponent },
      { path: ':theaterCode/login', component: InquiryLoginComponent },
      { path: 'confirm', component: InquiryConfirmComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
