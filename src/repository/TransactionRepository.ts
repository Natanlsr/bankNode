import Transaction from "../models/operations/Transaction";

export namespace TransactionRepository {
    var transactionMap = new Map<string, Transaction[]>();

    export function saveTransaction(document: string, transaction: Transaction): void {
       const transactions = transactionMap.get(document) ?? new Array<Transaction>();
       transactions.push(transaction);
       transactionMap.set(document, transactions);
    }

    export function getTransactions(document: string): Array<Transaction> | undefined {
        return transactionMap.get(document);
     }
}
