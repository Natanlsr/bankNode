
class AccountOperation implements BaseDocument{
    id: string;
    document: string;
    operation: string;
    type: string;
    amount: number;
    date: string;
    receiver: string | null;
    payer: string| null;

    constructor(id: string, document: string, operation: string, amount: number, date: string, receiver: string, payer: string, type: string){
        this.id = id;
        this.document = document;
        this.operation = operation;
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.receiver = receiver;
        this.payer = payer;
    }
}

export default AccountOperation;
