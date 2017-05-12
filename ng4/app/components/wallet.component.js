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
var wallet_service_1 = require("../services/wallet.service");
var wallet_1 = require("../model/wallet");
var accounts_service_1 = require("../services/accounts.service");
var WalletComponent = (function () {
    function WalletComponent(router, walletService, accountsService) {
        this.router = router;
        this.walletService = walletService;
        this.accountsService = accountsService;
        this.walletItems = [];
        this.accounts = [];
        this.notAddedAccounts = [];
        this.stored = false;
        this.error = null;
        this.emptied = false;
    }
    WalletComponent.prototype.ngOnInit = function () {
        var _this = this;
        var today = new Date(Date.now());
        today.setUTCHours(0, 0, 0, 0);
        this.lastUpdated = today.toISOString().slice(0, 10);
        // get all accounts (for the grid and chooser)
        this.accountsService.getAccounts().then(function (data) {
            data.forEach(function (account) {
                _this.accounts.push(account);
                _this.notAddedAccounts.push(account); // initially, put all accounts to add
            });
        });
        this.loadWallet();
    };
    WalletComponent.prototype.loadWallet = function () {
        var _this = this;
        this.walletItems = [];
        this.walletService.getWallet().then(function (data) {
            if (data.length > 0) {
                var wallet = data[0];
                var lastDate = new Date(wallet.lastUpdated);
                _this.lastUpdated = lastDate.toISOString().slice(0, 10);
                wallet.currentBalance.forEach(function (b) {
                    var account = _this.accounts.find(function (a) { return a.code === b.account; });
                    if (account) {
                        var item = {
                            account: account.name,
                            code: account.code,
                            currency: account.currency,
                            balance: Number(b.balance).toFixed(2),
                            newBalance: Number(b.balance).toFixed(2) // new balance defaults to the old one
                        };
                        _this.addItemToList(item, account);
                    }
                });
            }
        });
    };
    WalletComponent.prototype.addAccount = function () {
        if (this.accountToAdd) {
            var item = {
                account: this.accountToAdd.name,
                code: this.accountToAdd.code,
                currency: this.accountToAdd.currency,
                balance: 'N/A',
                newBalance: 0.00
            };
            this.addItemToList(item, this.accountToAdd);
            this.accountToAdd = null;
        }
    };
    WalletComponent.prototype.addItemToList = function (item, account) {
        this.walletItems.push(item);
        var index = this.notAddedAccounts.indexOf(account);
        if (index >= 0) {
            this.notAddedAccounts.splice(index, 1);
        }
    };
    WalletComponent.prototype.store = function () {
        var _this = this;
        this.stored = false;
        var wallet = new wallet_1.Wallet();
        wallet.lastUpdated = new Date(this.lastUpdated);
        this.walletItems.forEach(function (item) {
            wallet.currentBalance.push({
                account: item.code,
                balance: +Number(item.newBalance).toFixed(2)
            });
        });
        this.walletService.storeWallet(wallet).subscribe(function () {
            // clear the data and refresh the list
            _this.stored = true;
            setTimeout(function () { return _this.stored = false; }, 2000);
            _this.loadWallet();
        }, function (error) {
            _this.error = 'Wallet cannot be stored: ' + error.message;
        });
    };
    WalletComponent.prototype.emptyWallet = function () {
        var _this = this;
        this.emptied = false;
        this.walletService.emptyWallet().subscribe(function () {
            // clear the data and refresh the list
            _this.emptied = true;
            setTimeout(function () { return _this.emptied = false; }, 2000);
            _this.loadWallet();
        }, function (error) {
            _this.error = 'Wallet cannot be emptied: ' + error.message;
        });
    };
    return WalletComponent;
}());
WalletComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'app/templates/wallet.component.html',
        styles: ["\n    .number {\n      text-align: right;\n    }\n  "],
        providers: [wallet_service_1.WalletService, accounts_service_1.AccountsService]
    }),
    __metadata("design:paramtypes", [router_1.Router, wallet_service_1.WalletService, accounts_service_1.AccountsService])
], WalletComponent);
exports.WalletComponent = WalletComponent;
//# sourceMappingURL=wallet.component.js.map