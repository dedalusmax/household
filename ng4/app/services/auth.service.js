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
var profile_1 = require("../model/profile");
var Rx_1 = require("rxjs/Rx");
/** This service uses base HTTP service to make calls to the Users Web API. */
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    /** The class is constructed with the specific URL to the web API and Angular HTTP service. */
    function AuthService(http) {
        var _this = _super.call(this, 'profile', http) || this;
        _this.profile = new Rx_1.BehaviorSubject(null); // a reference to the profile retrieved from the web API
        _this.profile.next(new profile_1.Profile()); // clear profile
        return _this;
    }
    //#region Auth guard 
    /** This method returns true if the user has been already authenticated. */
    AuthService.prototype.isLoggedIn = function () {
        return this.profile.value.id != null;
    };
    /** This method get the user data and therefore marks the authentication successful. */
    AuthService.prototype.logIn = function (credentials) {
        return this.postJson(credentials, null, 'login');
    };
    AuthService.prototype.logout = function () {
        // remove user from the cache to log user out
        this.profile.next(new profile_1.Profile()); // clear profile
    };
    //#endregion
    //#region registration
    AuthService.prototype.checkProfile = function (credentials) {
        return this.postJson(credentials, null, 'login');
    };
    AuthService.prototype.register = function (suggestion) {
        return this.postJson(suggestion, null, 'register');
    };
    //#endregion
    //#region profile management
    AuthService.prototype.getProfile = function (id) {
        return this.getJson(['id=' + id], null, 'get');
    };
    AuthService.prototype.changeProfile = function (profile) {
        return this.postJson(profile, null, 'change');
    };
    return AuthService;
}(http_service_1.HttpService));
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map