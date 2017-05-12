"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require("@angular/http");
var http_service_1 = require("./http.service");
var WalletService = (function (_super) {
    __extends(WalletService, _super);
    function WalletService(http) {
        return _super.call(this, 'wallet', http) || this;
    }
    WalletService.prototype.getWallet = function () {
        return this.getJson(null, null, 'get');
    };
    WalletService.prototype.storeWallet = function (wallet) {
        return this.postJson(wallet, null, 'store');
    };
    WalletService.prototype.emptyWallet = function () {
        return this.deleteJson(null, null, 'delete');
    };
    return WalletService;
}(http_service_1.HttpService));
WalletService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map