import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, ContentChildren } from '@angular/core';
import { TransactionsService } from '../shared/services/transactions.service';
import { Transaction } from '../shared/models/transaction';
import { TransactionComponent } from './transaction.component';

import { Datagrid, DatagridColumn } from 'clarity-angular';

import { ImportComponent } from '../import/import.component';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [TransactionsService]
})
export class TransactionsComponent implements OnInit {

    @ViewChild(TransactionComponent) dialog: TransactionComponent;
    @ViewChild(Datagrid) datagrid: Datagrid;
    @ViewChildren(DatagridColumn) columns: QueryList<DatagridColumn>;
    @ViewChild('grid') grid: any;
    @ContentChildren(DatagridColumn) elements: any;

    @ViewChild(ImportComponent) importComponent: ImportComponent;

    term: string;

    transactions: Array<any> = [];

    constructor(private transactionsService: TransactionsService,
    private element: ElementRef) {}

    ngOnInit() {
        this.loadTransactions();
    }

    export() {

        let columns = this.element.nativeElement.getElementsByTagName('clr-dg-column');
        for (let c = 0; c < columns.length; c++) {
            if (columns[c].classList.contains('no-export')) {
                console.log('IGNORED!');
            } else {
                console.log(columns[c].innerText);
            }
        };

        let rows = this.element.nativeElement.getElementsByTagName('clr-dg-row');
        for (let r = 0; r < rows.length; r++) {
            let row = rows[r];
            console.log(row);
            for (let c = 0; c < row.children.length; c++) {
                if (row.children[c].classList.contains('no-export')) {
                    console.log('IGNORED!');
                } else {
                    console.log(row.children[c].innerText);
                }
            }
        };
    }

    add() {
        this.dialog.opened = true;
        this.dialog.title = 'Add new transaction';
        this.dialog.model = new Transaction();
    }

    edit(selectedItem: Transaction) {
        this.dialog.opened = true;
        this.dialog.title = 'Edit transaction';
        this.dialog.model = selectedItem;
    }

    delete(selectedItem: Transaction) {
        console.log('');
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
