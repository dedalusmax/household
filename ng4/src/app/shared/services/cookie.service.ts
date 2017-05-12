import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
    protected get cookieString(): string {
        return document.cookie || '';
    }

    protected set cookieString(val: string) {
        document.cookie = val;
    }

    get(key: string): string {
        return (<any>this._cookieReader())[key];
    }

    put(key: string, value: string) {
        this._cookieWriter()(key, value);
    }

    remove(key: string): void {
        this._cookieWriter()(key, undefined);
    }

    private _cookieReader(): any {
        let lastCookies = {};
        let lastCookieString = '';
        let that = this;

        let cookieArray: Array<string>;
        let cookie: string;
        let i: number;
        let index: number;
        let name: string;

        let currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {  // ignore nameless cookies
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));
                    // the first value that is seen for a cookie is the most
                    // specific one.  values for the same cookie name that
                    // follow are for less specific paths.
                    if (this.isBlank((<any>lastCookies)[name])) {
                        (<any>lastCookies)[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    }

    private _cookieWriter() {
        let that = this;

        return function (name: string, value: string) {
            that.cookieString = that._buildCookieString(name, value);
        };
    }

    private _safeDecodeURIComponent(str: string) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return str;
        }
    }

    private _buildCookieString(name: string, value: string): string {
        let expires: any;
        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (this.isString(expires)) {
            expires = new Date(expires);
        }

        let str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += expires ? ';expires=' + expires.toUTCString() : '';

        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        let cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log(`Cookie \'${name}\' possibly not set or overflowed because it was too 
      large (${cookieLength} > 4096 bytes)!`);
        }
        return str;
    }

    private isBlank(obj: any): boolean {
        return obj === undefined || obj === null;
    }

    private isString(obj: any): obj is string {
        return typeof obj === 'string';
    }
}
