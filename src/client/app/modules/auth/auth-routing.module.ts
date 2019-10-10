import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSigninComponent } from './components/pages/auth-signin/auth-signin.component';


const routes: Routes = [
  { path: 'signin', component: AuthSigninComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
