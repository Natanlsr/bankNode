class Transaction{
    id: string;
    payer: string;
    receiver: string;
    amount: number;
    operationDate: Date;

    constructor(id: string, payer: string, receiver: string, amount: number, operationDate: Date){
        this.id = id;
        this.payer = payer
        this.receiver = receiver;
        this.amount = amount;
        this.operationDate = operationDate;
    }
}

export default Transaction;
