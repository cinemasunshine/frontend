import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TestScreenComponent } from './pages/test-screen/test-screen.component';
import { TestRoutingModule } from './test-routing.module';


@NgModule({
  declarations: [
    TestScreenComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule,
  ]
})
export class TestModule { }
