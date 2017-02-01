import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { Wallet, AccountBalance } from '../model/wallet';

@Component({
  selector: 'register',
  templateUrl: 'app/templates/wallet.component.html',
  providers: [WalletService]
})
export class WalletComponent implements OnInit { 

    model: Wallet;

    constructor(private router: Router, private walletService: WalletService) {}

    ngOnInit() {

        this.model = new Wallet();
        let today = new Date(Date.now());
        today.setHours(0, 0, 0, 0);
        this.model.lastUpdated = today;
        this.model.currentBalance = [];

        this.walletService.getWallet().then((data) => {
            if (data.length > 0) {
                this.model = data[0];
            }
        });
    }
}