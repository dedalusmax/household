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
var profile_1 = require("../model/profile");
var currency_1 = require("../model/currency");
var language_1 = require("../model/language");
var RegisterComponent = (function () {
    function RegisterComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.model = new profile_1.Profile();
        // choosers:
        this.currencies = [];
        this.languages = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // filling up the lists:
        this.currencies.push(new currency_1.Currency('HRK', 'Hrvatska kuna (Kn)'));
        this.currencies.push(new currency_1.Currency('EUR', 'Euro (€)'));
        this.currencies.push(new currency_1.Currency('USD', 'US Dollar ($)'));
        this.currency = this.currencies[0];
        this.languages.push(new language_1.Language('HR', 'Hrvatski'));
        this.languages.push(new language_1.Language('EN', 'English'));
        this.languages.push(new language_1.Language('DE', 'Deutsch'));
        this.language = this.languages[0];
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        //first check whether the profile with that username and password exists
        this.authService.checkProfile(this.model).subscribe(function (data) {
            if (data && data.id) {
                _this.error = 'Username with this password already registered!';
                _this.showError = true;
            }
            else {
                _this.model.createdDate = new Date(Date.now());
                _this.model.baseCurrency = _this.currency.code;
                _this.model.language = _this.language.code;
                _this.authService.register(_this.model).subscribe(function (nothing) {
                    _this.authService.profile.next(_this.model); // inject profile data for subscribers
                    _this.router.navigate(['/']);
                }, function (error) {
                    _this.error = 'Profile cannot be registered: ' + error.message;
                    _this.showError = true;
                });
            }
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'app/templates/register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map