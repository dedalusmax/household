import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionsService extends HttpService {

    constructor(http: Http) { super('tran', http); }

    getTransactions() {
        return this.getJson<Array<Transaction>>(null, null, 'get');
    }

    addTransaction(transaction: Transaction) {
        return this.postJson<Transaction>(transaction, null, 'add');
    }

    deleteTransaction(id: string) {
        return this.deleteJson(['id=' + id], null, 'delete');
    }
}
