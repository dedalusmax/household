import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../shared/services/transactions.service';
import { Transaction } from '../shared/model/transaction';

@Component({
  selector: 'transactions',
  templateUrl: './app/transactions/transactions.component.html',
  styleUrls: ['./app/transactions/transactions.component.css'],
  providers: [TransactionsService]
})
export class TransactionsComponent implements OnInit { 

    term: string;

    transactions = [];

    constructor(private transactionsService: TransactionsService) {}

    ngOnInit() {
        this.loadTransactions();
    }

    loadTransactions() {
        this.transactions = [];
        this.transactionsService.getTransactions().then((data) => {
            data.forEach((transaction) => {
                let item =  {
                    id: transaction.id,
                    date: transaction.date,
                    costCenter: transaction.costCenter,
                    category: transaction.category,
                    description: transaction.description,
                    amount: Number(transaction.amount).toFixed(2),
                    account: transaction.account,
                    transfer: transaction.transfer
                };
                this.transactions.push(item);
            });
        });
    }
}