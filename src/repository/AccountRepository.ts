import Account from '../models/Account';

export namespace AccountRepository {

    var accountsMap = new Map<string, Account>();

    export function saveAccount(account: Account): void {
        if (getAccount(account.id)) {
            accountsMap.set(account.id, account);
        } else {
            console.error('Account already exists', account.id);
        }
    }

    export function updateAccount(account: Account): void {
        if (getAccount(account.id)) {
            accountsMap.set(account.id, account);
        } else {
            console.error('Account not exists', account.id);
        }
    }

    export function getAccount(accountId: string): Account | undefined {
        return accountsMap.get(accountId);
    }
}
