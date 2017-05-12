"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var core_2 = require("angular2-cookie/core");
var accounts_service_1 = require("../services/accounts.service");
var AppComponent = (function () {
    function AppComponent(router, authService, cookieService, accountsService) {
        this.router = router;
        this.authService = authService;
        this.cookieService = cookieService;
        this.accountsService = accountsService;
        this.loggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationStart; })
            .subscribe(function (event) {
            _this.location = event.url;
        });
        // read the credentials from cookie
        var cookie = this.cookieService.getObject('profile');
        if (cookie && !this.authService.isLoggedIn()) {
            // try to silently login
            this.authService.logIn(cookie).subscribe(function (data) {
                if (data) {
                    _this.authService.profile.next(data); // inject profile data for subscribers
                }
            });
        }
        this.authService.profile.asObservable().subscribe(function (data) {
            if (data && data.id) {
                _this.currentUser = data.displayName;
                _this.loggedIn = true;
                // search for the accounts
                _this.accountsService.getAccounts().then(function (data) {
                    _this.noAccounts = data.length == 0;
                });
            }
            else {
                _this.currentUser = 'Not logged in';
                _this.loggedIn = false;
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/templates/app.component.html',
        providers: [accounts_service_1.AccountsService]
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, core_2.CookieService,
        accounts_service_1.AccountsService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map