import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {

    constructor() { }

    appName: string;
    appVersion: string;
    apiEndpoint: string;
}