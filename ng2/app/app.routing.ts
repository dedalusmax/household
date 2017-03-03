import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent }   from './components/about.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { TransactionsComponent } from './components/transactions.component';
import { ProfileComponent } from './components/profile.component';
import { AccountsComponent } from './components/accounts.component';
import { WalletComponent } from './components/wallet.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
