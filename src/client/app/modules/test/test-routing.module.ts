import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestScreenComponent } from './pages/test-screen/test-screen.component';


const routes: Routes = [
  { path: ':theaterCode/:screenCode/screen', component: TestScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
