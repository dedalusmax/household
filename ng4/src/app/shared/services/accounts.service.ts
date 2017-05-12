import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Account } from '../models/account';
import { AppSettings } from '../models/app-settings';

@Injectable()
export class AccountsService extends HttpService {

    constructor(private appSetting: AppSettings, http: Http) {
        super(appSetting.apiEndpoint + 'accounts', http);
    }

    getAccounts() {
        return this.getJson<Array<Account>>(null, null, 'get');
    }

    addAccount(account: Account) {
        return this.postJson<Account>(account, null, 'add');
    }

    deleteAccount(id: string) {
        return this.deleteJson(['id=' + id], null, 'delete');
    }
}
