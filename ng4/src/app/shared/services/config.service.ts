import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../models/app-settings';

@Injectable()
export class ConfigService {
    public config: AppSettings;

    constructor(private http: Http) {
    }

    load() {
        let promise = this.http.get('app.config.json').map(res => res.json()).toPromise();
        promise.then(data => this.config = data);
        return promise;
    }
};
