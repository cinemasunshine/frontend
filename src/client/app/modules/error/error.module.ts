import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './pages/error/error.component';
import { ExpiredComponent } from './pages/expired/expired.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    ErrorComponent,
    ExpiredComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule,
  ]
})
export class ErrorModule { }
