import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Wallet } from '../model/wallet';

@Injectable()
export class WalletService extends HttpService {

    constructor(http: Http) { super('wallet', http); }

    getWallet() {
        return this.getJson<Wallet[]>(null, null, 'get');
    }

    storeWallet(wallet: Wallet) {
        return this.postJson<Wallet>(wallet, null, 'store');
    }

    emptyWallet() {
        return this.deleteJson(null, null, 'delete');
    }
}