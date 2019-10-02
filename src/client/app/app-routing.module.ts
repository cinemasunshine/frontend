import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { TestGuardService } from './guards';
import { ErrorModule } from './modules/error/error.module';
import { BaseComponent } from './modules/shared/components/pages/base/base.component';

const routes: Routes = [
    { path: '', redirectTo: 'purchase/transaction', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'purchase',
        loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule)
    },
    {
        path: 'inquiry',
        loadChildren: () => import('./modules/inquiry/inquiry.module').then(m => m.InquiryModule)
    },
    {
        path: 'test',
        canActivate: [TestGuardService],
        loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)
    },
    {
        path: '',
        component: BaseComponent,
        loadChildren: () => ErrorModule
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: !environment.production })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
