import Operation from "models/enums/Operation";

class AccountOperation{
    accountId: string;
    operation: String;
    amount: number;
    date: Date;

    constructor(accountId: string, operation: String, amount: number, date: Date){
        this.accountId = accountId;
        this.operation = operation;
        this.amount = amount;
        this.date = date;
    }
}

export default AccountOperation;
