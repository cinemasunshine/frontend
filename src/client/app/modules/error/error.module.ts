import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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
    // ErrorRoutingModule,
    SharedModule,
  ],
  exports: [
    ErrorComponent,
    ExpiredComponent,
    NotFoundComponent
  ],
})
export class ErrorModule { }
