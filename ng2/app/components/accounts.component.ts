import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../model/account';
import { Currency } from '../model/currency';

class AccountType {
    constructor(public type: string, public name: string) {}
}

@Component({
  selector: 'register',
  templateUrl: 'app/templates/accounts.component.html',
  providers: [AccountsService]
})
export class AccountsComponent implements OnInit { 

    accounts = [];
    model: Account;
    added = false;
    error = null;

    // choosers:
    accountTypes: AccountType[] = [];
    accountType: AccountType;
    currencies: Currency[] = [];
    currency: Currency;

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
                    name: account.name,
                    code: account.code,
                    type: account.type,
                    currency: account.currency,
                    balance: 0.00
                };
                this.accounts.push(item);
            });
        });
    }

    add() {
        this.added = false;
        this.model.currency = this.currency.code;
        this.model.type = this.accountType.type;

        this.accountsService.addAccount(this.model).subscribe(() => {
            this.added = true;
            this.loadAccounts();
        },
        error => {
            this.error = 'Account cannot be added: ' + error.message;
        });
    }
}