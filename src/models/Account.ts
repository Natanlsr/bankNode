import AccountStatus from "./enums/AccountStatus";

class Account implements BaseDocument{
    id: string;
    document: string;
    type: string;
    balance: number;
    status: string;
    creationDate: string;

    constructor(id: string, customerDocument: string, balance: number, status: AccountStatus, creationDate: string, type: string){
        this.id = id;
        this.document = customerDocument;
        this.type = type;
        this.balance = balance;
        this.status = status;
        this.creationDate = creationDate;
    }
   

}

export default Account;
