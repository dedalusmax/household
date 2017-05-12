import { Component, OnInit, Input } from '@angular/core';
import { TransactionsService } from '../shared/services/transactions.service';
import { Transaction } from '../shared/models/transaction';

@Component({
  selector: 'transaction',
  templateUrl: './/transaction.component.html',
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
