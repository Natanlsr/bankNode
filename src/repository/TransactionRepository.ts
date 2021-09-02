import Transaction from "../models/operations/Transaction";

export namespace TransactionRepository {
    var transactionMap = new Map<string, Transaction[]>();

    export function saveTransaction(transaction: Transaction): void {
       const transactions = transactionMap.get(transaction.id) ?? new Array<Transaction>();
       transactionMap.set(transaction.id, transactions);
    }
}
