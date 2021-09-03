import AccountOperation from '../models/operations/AccountOperation';

export namespace OperationRepository {
    var operationMap = new Map<string, AccountOperation[]>();

    export function saveOperation(operation: AccountOperation): void {
        const operations =
            operationMap.get(operation.accountId) ??
            new Array<AccountOperation>();
        operations.push(operation);    
        operationMap.set(operation.accountId, operations);
    }

    export function getOperations(accountId: string): Array<AccountOperation> | undefined{
        return operationMap.get(accountId);
    }
}

