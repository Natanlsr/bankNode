import AccountStatus from "./enums/AccountStatus";

class Account{
    id: string;
    customerDocument: string;
    balance: number;
    status: AccountStatus;
    creationDate: Date;

    constructor(id: string, customerDocument: string, balance: number, status: AccountStatus, creationDate: Date){
        this.id = id;
        this.customerDocument = customerDocument;
        this.balance = balance;
        this.status = status;
        this.creationDate = creationDate;
    }

}

export default Account;
