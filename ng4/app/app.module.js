"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require("./rxjs-extensions");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var clarity_angular_1 = require("clarity-angular");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var app_routing_1 = require("./app.routing");
var auth_guard_1 = require("./auth.guard");
var auth_service_1 = require("./services/auth.service");
var app_component_1 = require("./components/app.component");
var about_component_1 = require("./components/about.component");
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var profile_component_1 = require("./components/profile.component");
var accounts_component_1 = require("./components/accounts.component");
var wallet_component_1 = require("./components/wallet.component");
var dashboard_component_1 = require("./components/dashboard.component");
var tabs_directive_1 = require("./directives/tabs.directive");
var equal_validator_1 = require("./directives/equal.validator");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing, clarity_angular_1.ClarityModule],
        declarations: [app_component_1.AppComponent, about_component_1.AboutComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent,
            profile_component_1.ProfileComponent, accounts_component_1.AccountsComponent, wallet_component_1.WalletComponent, dashboard_component_1.DashboardComponent,
            tabs_directive_1.TabsDirective, tabs_directive_1.TabDirective, equal_validator_1.EqualValidator],
        providers: [auth_service_1.AuthService, auth_guard_1.AuthGuard, cookies_service_1.CookieService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map