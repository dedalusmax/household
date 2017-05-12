import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent }   from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WalletComponent } from './wallet/wallet.component';
import { AuthGuard } from './shared/services/auth.guard';

const appRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
