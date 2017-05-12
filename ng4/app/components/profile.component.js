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
var auth_service_1 = require("../services/auth.service");
var profile_1 = require("../model/profile");
var currency_1 = require("../model/currency");
var language_1 = require("../model/language");
var ProfileComponent = (function () {
    function ProfileComponent(authService) {
        this.authService = authService;
        this.model = new profile_1.Profile();
        this.updated = false;
        this.error = null;
        //password = '';
        //confirmPassword = '';
        // choosers:
        this.currencies = [];
        this.languages = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        // filling up the lists:
        var _this = this;
        this.currencies.push(new currency_1.Currency('HRK', 'Hrvatska kuna (Kn)'));
        this.currencies.push(new currency_1.Currency('EUR', 'Euro (€)'));
        this.currencies.push(new currency_1.Currency('USD', 'US Dollar ($)'));
        this.currency = this.currencies[0];
        this.languages.push(new language_1.Language('HR', 'Hrvatski'));
        this.languages.push(new language_1.Language('EN', 'English'));
        this.languages.push(new language_1.Language('DE', 'Deutsch'));
        this.language = this.languages[0];
        this.authService.getProfile(this.authService.profile.value.id).then(function (data) {
            _this.model = data;
            var currency = _this.currencies.find(function (c) { return c.code === data.baseCurrency; });
            if (currency) {
                _this.currency = currency;
            }
            var language = _this.languages.find(function (l) { return l.code === data.language; });
            if (language) {
                _this.language = language;
            }
        });
    };
    ProfileComponent.prototype.change = function () {
        var _this = this;
        this.error = null;
        this.updated = false;
        this.model.baseCurrency = this.currency.code;
        this.model.language = this.language.code;
        this.authService.changeProfile(this.model).subscribe(function (nothing) {
            _this.authService.profile.next(_this.model); // inject profile data for subscribers
            _this.updated = true;
        }, function (error) {
            _this.error = 'Profile cannot be updated: ' + error.message;
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: 'app/templates/profile.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map