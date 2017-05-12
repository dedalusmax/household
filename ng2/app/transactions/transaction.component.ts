import { Component, OnInit, Input } from '@angular/core';
import { TransactionsService } from '../shared/services/transactions.service';
import { Transaction } from '../shared/model/transaction';

@Component({
  selector: 'transaction',
  templateUrl: './app/transactions/transaction.component.html',
  //styleUrls: ['./app/transactions/transactions.component.css'],
  providers: [TransactionsService]
})
export class TransactionComponent implements OnInit { 

    @Input()
    model: Transaction;

    title: string;
    opened: boolean;

    constructor(private transactionsService: TransactionsService) {}

    ngOnInit() {
        this.model = new Transaction();
    }
}