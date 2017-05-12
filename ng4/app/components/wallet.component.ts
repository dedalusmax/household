import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { Wallet, AccountBalance } from '../model/wallet';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../model/account';

@Component({
  selector: 'register',
  templateUrl: 'app/templates/wallet.component.html',
  styles: [`
    .number {
      text-align: right;
    }
  `],
  providers: [WalletService, AccountsService]
})
export class WalletComponent implements OnInit { 

    lastUpdated: string;
    walletItems = [];

    accounts: Account[] = [];
    notAddedAccounts: Account[] = [];
    accountToAdd: Account;

    stored = false;
    error = null;
    emptied = false;

    constructor(private router: Router, private walletService: WalletService, private accountsService: AccountsService) {}

    ngOnInit() {

        let today = new Date(Date.now());
        today.setUTCHours(0, 0, 0, 0);
        this.lastUpdated = today.toISOString().slice(0,10);

        // get all accounts (for the grid and chooser)
        this.accountsService.getAccounts().then((data) => {
            data.forEach((account) => {
                this.accounts.push(account);
                this.notAddedAccounts.push(account); // initially, put all accounts to add
            });
        });

        this.loadWallet();
    }

    loadWallet() {
        this.walletItems = [];

        this.walletService.getWallet().then((data) => {
            if (data.length > 0) {
                let wallet = data[0];

                let lastDate = new Date(wallet.lastUpdated);
                this.lastUpdated = lastDate.toISOString().slice(0,10);

                wallet.currentBalance.forEach((b) => {
                    let account = this.accounts.find((a) => a.code === b.account);
                    if (account) {
                        let item = {
                            account: account.name,
                            code: account.code,
                            currency: account.currency,
                            balance: Number(b.balance).toFixed(2),
                            newBalance: Number(b.balance).toFixed(2) // new balance defaults to the old one
                        };
                        this.addItemToList(item, account);
                    }
                });
            }
        });       
    }

    addAccount() {
        if (this.accountToAdd) {
            let item = {
                account: this.accountToAdd.name,
                code: this.accountToAdd.code,
                currency: this.accountToAdd.currency,
                balance: 'N/A',
                newBalance: 0.00
            };
            this.addItemToList(item, this.accountToAdd);
            this.accountToAdd = null;
        }
    }

    addItemToList(item, account) {
        this.walletItems.push(item);
        let index = this.notAddedAccounts.indexOf(account);
        if (index >= 0) {
            this.notAddedAccounts.splice(index, 1);
        }
    }

    store() {
        this.stored = false;

        let wallet = new Wallet();
        wallet.lastUpdated = new Date(this.lastUpdated);
        this.walletItems.forEach((item) => {
            wallet.currentBalance.push({
                account: item.code,
                balance: +Number(item.newBalance).toFixed(2)
            });
        });
        this.walletService.storeWallet(wallet).subscribe(() => {
            // clear the data and refresh the list
            this.stored = true;
            setTimeout(() => this.stored = false, 2000);
            this.loadWallet();
        },
        error => {
            this.error = 'Wallet cannot be stored: ' + error.message;
        });
    }

    emptyWallet() {
        this.emptied = false;
        this.walletService.emptyWallet().subscribe(() => {
            // clear the data and refresh the list
            this.emptied = true;
            setTimeout(() => this.emptied = false, 2000);
            this.loadWallet();
        },
        error => {
            this.error = 'Wallet cannot be emptied: ' + error.message;
        });        
    }
}