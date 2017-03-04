import './rxjs-extensions';

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ClarityModule }  from 'clarity-angular';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { routing }        from './app.routing';
import { AuthGuard }      from '../shared/services/auth.guard';
import { AuthService }    from '../shared/services/auth.service';

import { AppComponent } from './app.component';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { WalletComponent } from '../wallet/wallet.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TransactionsComponent } from '../transactions/transactions.component';

import { TabsComponent } from '../shared/components/tabs.component';
import { TabComponent } from '../shared/components/tab.component';
import { EqualValidator } from '../shared/directives/equal.validator';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { SearchBoxComponent } from '../shared/components/search-box.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, ClarityModule ],
  declarations: [ AppComponent, AboutComponent, LoginComponent, RegisterComponent, 
                  ProfileComponent, AccountsComponent, WalletComponent, DashboardComponent,
                  TransactionsComponent,
                  TabsComponent, TabComponent, EqualValidator,
                  SearchPipe, SearchBoxComponent
                   ],
  providers:    [ AuthService, AuthGuard, CookieService ], // { provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap:    [ AppComponent ]
})
export class AppModule { }