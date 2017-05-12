import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { ConfigService } from './shared/services/config.service';
import { CookieService } from './shared/services/cookie.service';

import { AppSettings } from './shared/models/app-settings';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { WalletComponent } from './wallet/wallet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transactions/transaction.component';

import { TabsDirective, TabDirective } from './shared/directives/tabs.directive';
import { EqualValidator } from './shared/directives/equal.validator';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SearchBoxComponent } from './shared/components/search-box.component';

import { ImportComponent } from './import/import.component';
import { ImportService } from './import/import.service';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpModule,
      ClarityModule.forRoot()
  ],
  declarations: [
      AppComponent,
      AboutComponent,
      LoginComponent,
      RegisterComponent,
      ProfileComponent,
      AccountsComponent,
      WalletComponent,
      DashboardComponent,
      TransactionsComponent,
      TransactionComponent,
      TabsDirective, TabDirective,
      EqualValidator,
      SearchPipe, SearchBoxComponent,
      ImportComponent
  ],
  providers: [
      Location,
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      ConfigService,
      {
          provide: APP_INITIALIZER,
          useFactory: (config: ConfigService) => () => config.load(),
          deps: [ConfigService, Http],
          multi: true
      },
      {
          provide: AppSettings,
          useFactory: (configService: ConfigService) => {
              return configService.config;
          },
          deps: [ConfigService]
      },
      AuthGuard,
      AuthService,
      CookieService,
      ImportService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
