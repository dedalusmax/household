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
var accounts_service_1 = require("../services/accounts.service");
var account_1 = require("../model/account");
var currency_1 = require("../model/currency");
var AccountType = (function () {
    function AccountType(type, name) {
        this.type = type;
        this.name = name;
    }
    return AccountType;
}());
var AccountsComponent = (function () {
    function AccountsComponent(router, accountsService) {
        this.router = router;
        this.accountsService = accountsService;
        this.accounts = [];
        this.selectedAccounts = [];
        this.deleted = false;
        this.initialBalance = 0.00;
        this.added = false;
        this.error = null;
        // choosers:
        this.accountTypes = [];
        this.currencies = [];
    }
    AccountsComponent.prototype.ngOnInit = function () {
        // filling the data for new account
        this.model = new account_1.Account();
        this.accountTypes.push(new AccountType('GOT', 'Pocket money'));
        this.accountTypes.push(new AccountType('BANK', 'Bank account'));
        this.accountTypes.push(new AccountType('CARD', 'Credit card'));
        this.accountType = this.accountTypes[0];
        this.currencies.push(new currency_1.Currency('HRK', 'Hrvatska kuna (Kn)'));
        this.currencies.push(new currency_1.Currency('EUR', 'Euro (€)'));
        this.currencies.push(new currency_1.Currency('USD', 'US Dollar ($)'));
        this.currency = this.currencies[0];
        this.loadAccounts();
    };
    AccountsComponent.prototype.loadAccounts = function () {
        var _this = this;
        this.accounts = [];
        this.accountsService.getAccounts().then(function (data) {
            data.forEach(function (account) {
                var item = {
                    id: account.id,
                    name: account.name,
                    code: account.code,
                    type: account.type,
                    description: account.description,
                    currency: account.currency,
                    balance: Number(0).toFixed(2),
                    selected: false
                };
                _this.accounts.push(item);
            });
        });
    };
    AccountsComponent.prototype.deleteAccounts = function () {
        var _this = this;
        this.deleted = false;
        this.selectedAccounts.forEach(function (selected) {
            _this.accountsService.deleteAccount(selected.id).subscribe(function (result) {
                // nothing there
            }, function (error) {
                _this.error = 'Account cannot be added: ' + error.message;
                return false;
            });
        });
        if (!this.error) {
            this.deleted = true;
            this.selectedAccounts = [];
            setTimeout(function () {
                _this.deleted = false;
                _this.loadAccounts();
            }, 2000);
        }
    };
    AccountsComponent.prototype.add = function () {
        var _this = this;
        this.added = false;
        this.model.currency = this.currency.code;
        this.model.type = this.accountType.type;
        this.accountsService.addAccount(this.model).subscribe(function () {
            _this.added = true;
            // TODO: add first transaction with initial balance
            // this.initialBalance.toFixed(2)
            setTimeout(function () { return _this.added = false; }, 3000);
            // clear the data and refresh the list
            _this.model = new account_1.Account();
            _this.initialBalance = 0.00;
            _this.loadAccounts();
        }, function (error) {
            _this.error = 'Account cannot be added: ' + error.message;
        });
    };
    return AccountsComponent;
}());
AccountsComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'app/templates/accounts.component.html',
        styles: ["\n    .number {\n      text-align: right;\n    }\n  "],
        providers: [accounts_service_1.AccountsService]
    }),
    __metadata("design:paramtypes", [router_1.Router, accounts_service_1.AccountsService])
], AccountsComponent);
exports.AccountsComponent = AccountsComponent;
//# sourceMappingURL=accounts.component.js.map