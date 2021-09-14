import {
    PutItemCommand,
    QueryCommand,
    QueryCommandInput,
} from '@aws-sdk/client-dynamodb';
import { DynamoDbConfig } from '../config/DynamoDbConfig';
import TABLE_NAME from '../utils/TableNameUtil';
import Account from '../models/Account';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { KeysFormatterUtils } from '../utils/KeysFormatterUtils';
import AccountOperation from '../models/operations/AccountOperation';
import AccountDetails from '../models/AccountDetails';

class AccountRepository {
    private dynamoClient = DynamoDbConfig.getDynamoClient();

    async saveAccount(account: Account, tenant: string): Promise<Account> {
        this.setTenantAndTypeInAccount(account, tenant);

        var params = {
            TableName: TABLE_NAME,
            Item: marshall(account),
        };
        await this.dynamoClient.send(new PutItemCommand(params));

        return account;
    }

    async updateAccount(account: Account, tenant: string): Promise<void> {
        var params = {
            TableName: TABLE_NAME,
            Item: marshall(account),
        };
        await this.dynamoClient.send(new PutItemCommand(params));
    }

    async getAccount(
        document: string,
        tenant: string,
    ): Promise<Account | undefined> {
        const documentToSearch = KeysFormatterUtils.concantTenatIfNecessary(
            document,
            tenant,
        );
        const params = this.getParamsQuery(
            documentToSearch,
            Account.name.toString().toUpperCase(),
        );

        const data = await this.dynamoClient.send(new QueryCommand(params));
        const accountFinded = data.Items?.find(x => x !== undefined);

        if (accountFinded) {
            return unmarshall(accountFinded) as Account;
        }

        return undefined;
    }

    async saveOperation(
        operation: AccountOperation,
        tenant: string,
    ): Promise<AccountOperation> {
        this.setTenantAndTypeInOperation(operation, tenant);

        var params = {
            TableName: TABLE_NAME,
            Item: marshall(operation),
        };

        await this.dynamoClient.send(new PutItemCommand(params));

        return operation;
    }

    async getFullAccountInformations(
        document: string,
        tenant: string,
    ): Promise<AccountDetails> {
        const documentToSearch = KeysFormatterUtils.concatTenant(
            document,
            tenant,
        );

        const params = {
            KeyConditionExpression: '#doc = :dc',
            ExpressionAttributeValues: {
                ':dc': { S: documentToSearch },
            },
            ExpressionAttributeNames: {
                '#doc': 'document',
            },
            TableName: TABLE_NAME,
        };

        const result = await this.dynamoClient.send(new QueryCommand(params));
        const operationsFinded: Array<AccountOperation> = [];
        var accountFinded: Account;

        if (!result.Items) {
            throw Error('Account information not found');
        }

        for (const data of result.Items) {
            switch (KeysFormatterUtils.getDocumentType(data.type.S!!)) {
                case Account.name.toUpperCase(): {
                    accountFinded = unmarshall(data) as Account;
                    break;
                }
                case AccountOperation.name.toUpperCase(): {
                    operationsFinded.push(unmarshall(data) as AccountOperation);
                    break;
                }
            }
        }

        return new AccountDetails(accountFinded!!, operationsFinded);
    }

    private getParamsQuery(document: string, type: string): QueryCommandInput {
        return {
            KeyConditionExpression: '#doc = :dc and begins_with(#docTy, :ty)',
            ExpressionAttributeValues: {
                ':dc': { S: document },
                ':ty': { S: type },
            },
            ExpressionAttributeNames: {
                '#doc': 'document',
                '#docTy': 'type',
            },
            TableName: TABLE_NAME,
        };
    }

    private setTenantAndTypeInAccount(account: Account, tenant: string) {
        account.document = KeysFormatterUtils.concatTenant(
            account.document,
            tenant,
        );
        account.type = KeysFormatterUtils.concatDocumentType(
            account.id,
            account.type,
        );
    }

    private setTenantAndTypeInOperation(
        operation: AccountOperation,
        tenant: string,
    ) {
        operation.document = KeysFormatterUtils.concatTenant(
            operation.document,
            tenant,
        );
        operation.type = KeysFormatterUtils.concatDocumentType(
            operation.id,
            operation.type,
        );
    }
}

export default new AccountRepository();
