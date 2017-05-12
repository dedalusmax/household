import './rxjs-extensions';

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ClarityModule }  from 'clarity-angular';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { routing }        from './app.routing';
import { AuthGuard }      from './auth.guard';
import { AuthService }    from './services/auth.service';

import { AppComponent }   from './components/app.component';
import { AboutComponent }   from './components/about.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { ProfileComponent } from './components/profile.component';
import { AccountsComponent } from './components/accounts.component';
import { WalletComponent } from './components/wallet.component';
import { DashboardComponent } from './components/dashboard.component';

import { TabsDirective, TabDirective } from './directives/tabs.directive';
import { EqualValidator } from './directives/equal.validator';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, ClarityModule ],
  declarations: [ AppComponent, AboutComponent, LoginComponent, RegisterComponent, 
                  ProfileComponent, AccountsComponent, WalletComponent, DashboardComponent,
                  TabsDirective, TabDirective, EqualValidator ],
  providers:    [ AuthService, AuthGuard, CookieService ], // { provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap:    [ AppComponent ]
})
export class AppModule { }