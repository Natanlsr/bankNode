import {DynamoDBClient, QueryOutput} from '@aws-sdk/client-dynamodb';
import Account from "models/Account";
import AccountStatus from "models/enums/AccountStatus";
import Operation from 'models/enums/Operation';
import AccountOperation from 'models/operations/AccountOperation';
import AccountRepository from "repository/AccountRepository";


describe('Testing Account Repository', () => {
    const tenant = "tenant-test";
    const document = "doc-test";
    const documentWithTenant = document + "#" + tenant;

    afterEach(() => {
        jest.clearAllMocks()
    });


    test('Should save account with success and set tenant and type', async () => {
        const account = getAccount();
        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn());
        
        const result = await AccountRepository.saveAccount(account, tenant);

        expect(result).toBeDefined();
        expect(dbClientSpy).toHaveBeenCalledTimes(1);
        expect(result.document).toEqual(documentWithTenant);
        expect(result.balance).toEqual(account.balance);
        expect(result.type).toEqual("ACCOUNT#id-test");
    });

    test('Should update account with success', async () => {
        const account = getAccount();
        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn());
        
        await AccountRepository.updateAccount(account, tenant);

        expect(dbClientSpy).toHaveBeenCalledTimes(1);
    });

    test('Should get account with success', async () => {
        const account = getAccount();
        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn(() => getAccountQuery()));
        
        const result = await AccountRepository.getAccount(document, tenant);

        expect(result).toBeDefined();
        expect(dbClientSpy).toHaveBeenCalledTimes(1);
        expect(result?.balance).toEqual(account.balance);
        expect(result?.document).toEqual(account.document);
        expect(result?.id).toEqual(account.id);
    });

    test('Should return undefined in get account because account not exists', async () => {
        const valueToReturn = {
            Items: []
        };

        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn(() => valueToReturn));
        
        const result = await AccountRepository.getAccount(document, tenant);

        expect(result).toBeUndefined();
        expect(dbClientSpy).toHaveBeenCalledTimes(1);
    });

    test('Should save operation with success', async () => {
        const operation = getOperation();

        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn(() => operation));
        
        const result = await AccountRepository.saveOperation(operation, tenant);

        expect(result).toBeDefined();
        expect(dbClientSpy).toHaveBeenCalledTimes(1);
        expect(result.id).toEqual(operation.id);
        expect(result.amount).toEqual(operation.amount);
        expect(result.document).toEqual(documentWithTenant);
        expect(result.type).toEqual("ACCOUNTOPERATION#id-test");
    });

    test('Should get full information of account with success', async () => {
        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn(() => getAccountQueryWithOperation()));
        const account = getAccount();
        const operation = getOperation();

        const result = await AccountRepository.getFullAccountInformations(document, tenant);

        expect(result).toBeDefined();
        expect(dbClientSpy).toHaveBeenCalledTimes(1);
        expect(result.account).toBeDefined();
        expect(result.account).toEqual(account);
        expect(result.operations.length).toEqual(1);
        expect(result.operations[0]).toEqual(operation);

    });

    test('Should throw error because items is empty in get full information of account', async () => {
        const valueToReturn = {
            Items: undefined
        };

        const dbClientSpy = jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(jest.fn(() => valueToReturn));

        AccountRepository.getFullAccountInformations(document, tenant).catch(e =>
            expect(e).toEqual({
              error: 'Account information not found',
            }),
        );

        expect(dbClientSpy).toHaveBeenCalledTimes(1);
    });

    function getAccount(){
        return {
            id: "id-test",
            document: "doc-test",
            type: Account.name.toUpperCase(),
            balance: 100,
            status: AccountStatus.ACTIVE,
            creationDate: (new Date()).toString()
        }
    }
    
    function getAccountQuery(): QueryOutput{
        return{
            Items: [
                {
                    id: {S: "id-test"},
                    document: {S:"doc-test"},
                    type: {S:Account.name.toUpperCase()},
                    balance: {N:"100"},
                    status: {S:AccountStatus.ACTIVE},
                    creationDate: {S:(new Date()).toString()}
                }
            ]
        }
    }
    
    function getOperation(): AccountOperation{
        return  {
            id: "id-test",
            document: "doc-test",
            operation: Operation.DEPOSIT,
            type: AccountOperation.name.toUpperCase(),
            amount: 100,
            date: (new Date()).toString(),
            receiver: "",
            payer:""
        }
    }
    
    function getAccountQueryWithOperation(): QueryOutput{
        return{
            Items: [
                {
                    id: {S: "id-test"},
                    document: {S:"doc-test"},
                    type: {S:Account.name.toUpperCase()},
                    balance: {N:"100"},
                    status: {S:AccountStatus.ACTIVE},
                    creationDate: {S:(new Date()).toString()}
                },
    
                {
                    id: {S: "id-test"},
                    document: {S:"doc-test"},
                    operation: {S:Operation.DEPOSIT},
                    type: {S:AccountOperation.name.toUpperCase()},
                    amount: {N:"100"},
                    date: {S:(new Date()).toString()},
                    receiver: {S:""},
                    payer: {S:""}
                }
    
            ]
        }
    }
})
