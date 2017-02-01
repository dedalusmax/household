import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Account } from '../model/account';

@Injectable()
export class AccountsService extends HttpService {

    constructor(http: Http) { super('accounts', http); }

    getAccounts() {
        return this.getJson<Account[]>(null, null, 'get');
    }

    addAccount(account: Account) {
        return this.postJson<Account>(account, null, 'add');
    }
}