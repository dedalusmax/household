import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../shared/services/transactions.service';
import { Transaction } from '../shared/model/transaction';
import { TransactionComponent } from './transaction.component';

@Component({
  selector: 'transactions',
  templateUrl: './app/transactions/transactions.component.html',
  styleUrls: ['./app/transactions/transactions.component.css'],
  providers: [TransactionsService]
})
export class TransactionsComponent implements OnInit, AfterViewInit { 

    @ViewChild(TransactionComponent) dialog: TransactionComponent;

    term: string;

    transactions = [];

    constructor(private transactionsService: TransactionsService) {}

    ngOnInit() {
        this.loadTransactions();
    }

    ngAfterViewInit() { 
        
    }

    add() {
        this.dialog.opened = true;
        this.dialog.title = "Add new transaction";
        this.dialog.model = new Transaction();
    }

    edit(selectedItem: Transaction) {
        this.dialog.opened = true;
        this.dialog.title = "Edit transaction";
        this.dialog.model = selectedItem;
    }

    delete(selectedItem: Transaction) {

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