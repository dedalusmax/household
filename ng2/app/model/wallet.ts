export class AccountBalance {
    account: string;
    balance: number;
}

export class Wallet {
    lastUpdated: Date;
    currentBalance: AccountBalance[];
}