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
var http_1 = require("@angular/http");
// import { Observable } from 'rxjs/Observable';
/** This is the base service for accessing the Web API, inherit it when using the specific web service calls. */
var HttpService = (function () {
    /** The class is constructed with the URL to the web API and Angular HTTP service. */
    function HttpService(baseUrl, http) {
        this.baseUrl = baseUrl;
        this.http = http;
    }
    //#region Private methods
    /** This method works like a callback for extracting the data from the HTTP response. */
    HttpService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return null;
        }
        else {
            return res.json() || {};
        }
    };
    /** This method works like a callback for handling errors from the web API call. */
    HttpService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    /** This method constructs the first part of the URL based on application settings and action name (if specified). */
    HttpService.prototype.buildBaseUrl = function (controller, action) {
        var url = controller ? controller : this.baseUrl;
        if (action) {
            url += '/' + action;
        }
        return window['AppConfig'].apiEndpoint + '/' + url;
    };
    /** This method constructs query string based on the URL address and parameters provided. */
    HttpService.prototype.buildUrl = function (url, params) {
        if (params && params.length > 0) {
            params.forEach(function (param, index) {
                if (index === 0) {
                    url += '?' + param;
                }
                else {
                    url += '&' + param;
                }
            });
        }
        return url;
    };
    //#endregion 
    //#region JSON working methods
    HttpService.prototype.simpleGetJson = function (params, action) {
        var url = this.buildBaseUrl(null, action);
        url = this.buildUrl(url, params);
        var headers = new http_1.Headers({ 'Accept': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(url, options);
    };
    ;
    /** This method gets data from the server. */
    HttpService.prototype.getJson = function (params, controller, action) {
        var url = this.buildBaseUrl(controller, action);
        url = this.buildUrl(url, params);
        var headers = new http_1.Headers({ 'Accept': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ;
    /** This method posts data from the server. */
    HttpService.prototype.postJson = function (data, controller, action) {
        var body = JSON.stringify(data);
        var url = this.buildBaseUrl(controller, action);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(this.extractData);
    };
    /** This method deletes data from the server. */
    HttpService.prototype.deleteJson = function (params, controller, action) {
        var url = this.buildBaseUrl(controller, action);
        url = this.buildUrl(url, params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(url, options).map(this.extractData);
    };
    ;
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map