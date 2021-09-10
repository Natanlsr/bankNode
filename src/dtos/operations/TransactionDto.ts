
class TransactionDto{
    id: string;
    payer: string | null;
    receiver: string | null;
    amount: number;

    constructor(id: string, payer: string, receiver: string, amount: number){
        this.id = id;
        this.payer = payer
        this.receiver = receiver;
        this.amount = amount;
    }
}

export default TransactionDto;
