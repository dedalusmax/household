import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AuthGuard } from './auth.guard';
import { TabsDirective, TabDirective } from './directives/tabs.directive';
import { AuthService }  from './services/auth.service';

import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports:      [ BrowserModule, routing, ClarityModule ],
  declarations: [ AppComponent, TabsDirective, TabDirective ],
  providers:    [ AuthService, AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }