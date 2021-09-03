import Account from '../models/Account';

export namespace AccountRepository {

    var accountsMap = new Map<string, Account>();

    export function saveAccount(account: Account): void {
        if (!getAccount(account.customerDocument)) {
            accountsMap.set(account.customerDocument, account);
        } else {
            console.error('Account already exists', account.customerDocument);
        }
    }

    export function updateAccount(account: Account): void {
        if (getAccount(account.customerDocument)) {
            accountsMap.set(account.id, account);
        } else {
            console.error('Account not exists', account.customerDocument);
        }
    }

    export function getAccount(accountId: string): Account | undefined {
        return accountsMap.get(accountId);
    }
}
