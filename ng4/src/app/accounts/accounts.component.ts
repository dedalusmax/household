import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../shared/services/accounts.service';
import { Account } from '../shared/models/account';
import { Currency } from '../shared/models/currency';

import { ImportComponent } from '../import/import.component';
import { ImportSchema, ImportField } from '../import/import-schema';

class AccountType {
    constructor(public type: string, public name: string) {}
}

@Component({
  selector: 'register',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountsService]
})
export class AccountsComponent implements OnInit {

    accounts: Array<Account> = [];

    selectedAccounts: Array<Account> = [];
    deleted = false;

    model: Account;
    initialBalance = 0.00;
    added = false;
    error: string = null;

    // choosers:
    accountTypes: Array<AccountType> = [];
    accountType: AccountType;
    currencies: Array<Currency> = [];
    currency: Currency;

    @ViewChild(ImportComponent) importComponent: ImportComponent;

    constructor(private router: Router, private accountsService: AccountsService) {}

    ngOnInit() {
        // filling the data for new account
        this.model = new Account();

        this.accountTypes.push(new AccountType('GOT', 'Pocket money'));
        this.accountTypes.push(new AccountType('BANK', 'Bank account'));
        this.accountTypes.push(new AccountType('CARD', 'Credit card'));
        this.accountType = this.accountTypes[0];

        this.currencies.push(new Currency('HRK', 'Hrvatska kuna (Kn)'));
        this.currencies.push(new Currency('EUR', 'Euro (€)'));
        this.currencies.push(new Currency('USD', 'US Dollar ($)'));
        this.currency = this.currencies[0];

        this.loadAccounts();
    }

    loadAccounts() {
        this.accounts = [];
        this.accountsService.getAccounts().then((data) => {
            data.forEach((account) => {
                let item =  {
                    id: account.id,
                    name: account.name,
                    code: account.code,
                    type: account.type,
                    description: account.description,
                    currency: account.currency,
                    balance: Number(0).toFixed(2),
                    selected: false
                };
                this.accounts.push(item);
            });
        });
    }

    deleteAccounts() {
        this.deleted = false;
        this.selectedAccounts.forEach((selected) => {
            this.accountsService.deleteAccount(selected.id).subscribe((result) => {
                // nothing there
            },
            error => {
                this.error = 'Account cannot be added: ' + error.message;
                return false;
            });
        });
        if (!this.error) {
            this.deleted = true;
            this.selectedAccounts = [];
            setTimeout(() => {
                this.deleted = false;
                this.loadAccounts();
            }, 2000);
        }
    }

    add() {
        this.added = false;
        this.model.currency = this.currency.code;
        this.model.type = this.accountType.type;

        this.accountsService.addAccount(this.model).subscribe(() => {
            this.added = true;

            // TODO: add first transaction with initial balance
            // this.initialBalance.toFixed(2)

            setTimeout(() => this.added = false, 3000);
            // clear the data and refresh the list
            this.model = new Account();
            this.initialBalance = 0.00;
            this.loadAccounts();
        },
        error => {
            this.error = 'Account cannot be added: ' + error.message;
        });
    }

    import() {

        let schema = new ImportSchema('tran');

        let name = new ImportField('name', 'Account name');
        name.required = true;

        let code = new ImportField('code', 'Code');
        code.required = true;

        let type = new ImportField('type', 'Type');
        type.required = true;

        let description = new ImportField('description', 'Description');
        let currency = new ImportField('currency', 'Currency');

        schema.fields.push(name, code, type, description, currency);

        this.importComponent.open(schema);
    }
}
