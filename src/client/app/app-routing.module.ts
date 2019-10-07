import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { TestGuardService } from './guards';
import { ErrorComponent } from './modules/error/pages/error/error.component';
import { ExpiredComponent } from './modules/error/pages/expired/expired.component';
import { NotFoundComponent } from './modules/error/pages/not-found/not-found.component';
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
        children: [
            { path: 'error', component: ErrorComponent },
            { path: 'expired', component: ExpiredComponent },
            { path: '**', component: NotFoundComponent }
          ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: !environment.production })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
