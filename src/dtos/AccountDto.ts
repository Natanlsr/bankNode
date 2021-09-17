import Account from "../models/Account";
import AccountStatus from "../models/enums/AccountStatus";

class AccountDto{
    document: string;
    balance: number;
    status: string;
    creationDate: string;

    constructor(document: string, balance: number, status: AccountStatus, creationDate: string){
        this.document = document;
        this.balance = balance;
        this.status = status;
        this.creationDate = creationDate;
    }
}

export function toAccountDto(account: Account): AccountDto{
    return {
        document: account.document,
        balance: account.balance,
        status: account.status,
        creationDate: account.creationDate
    }
}

export default AccountDto;
