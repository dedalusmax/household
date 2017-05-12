import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

/** This is the base service for accessing the Web API, inherit it when using the specific web service calls. */
@Injectable()
export abstract class HttpService {

    /** The class is constructed with the URL to the web API and Angular HTTP service. */
    constructor(protected baseUrl: string, private http: Http) { }

    //#region Private methods

    /** This method works like a callback for extracting the data from the HTTP response. */
    private extractData(res: Response) {
        if (res.status === 204) {
            return null;
        } else {
            return res.json() || {};
        }
    }

    /** This method works like a callback for handling errors from the web API call. */
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    /** This method constructs the first part of the URL based on application settings and action name (if specified). */
    private buildBaseUrl(controller?: string, action?: string) {
        let url = controller ? controller : this.baseUrl;
        if (action) {
            url += '/' + action;
        }
        return url;
    }

    /** This method constructs query string based on the URL address and parameters provided. */
    private buildUrl(url: string, params?: Array<any>) {
        if (params && params.length > 0) {
            params.forEach((param, index) => {
                if (index === 0) {
                    url += '?' + param;
                } else {
                    url += '&' + param;
                }
            });
        }
        return url;
    }

    //#endregion 

    //#region JSON working methods

    simpleGetJson(params?: Array<any>, action?: string) {
        let url = this.buildBaseUrl(null, action);
        url = this.buildUrl(url, params);
        let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options);
    };

    /** This method gets data from the server. */
    getJson<T>(params?: Array<any>, controller?: string, action?: string): Promise<T> {
        let url = this.buildBaseUrl(controller, action);
        url = this.buildUrl(url, params);
        let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };

    /** This method posts data from the server. */
    postJson<T>(data: T, controller?: string, action?: string) {
        let body = JSON.stringify(data);
        let url = this.buildBaseUrl(controller, action);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options).map(this.extractData);
    }

    /** This method deletes data from the server. */
    deleteJson(params?: Array<any>, controller?: string, action?: string) {
        let url = this.buildBaseUrl(controller, action);
        url = this.buildUrl(url, params);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(url, options).map(this.extractData);
    };

    //#endregion 
}
