import './rxjs-extensions';

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ClarityModule }  from 'clarity-angular';

import { routing }        from './app.routing';
import { AuthGuard }      from './auth.guard';
import { AuthService }    from './services/auth.service';

import { AppComponent }   from './components/app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProfileComponent } from './components/profile.component';
import { TabsDirective, TabDirective } from './directives/tabs.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, ClarityModule ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent, DashboardComponent, ProfileComponent, TabsDirective, TabDirective ],
  providers:    [ AuthService, AuthGuard ], // { provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap:    [ AppComponent ]
})
export class AppModule { }