import AccountOperationReceiver from "commands/write-commands/AccountOperationReceiver";
import AccountOperationDto from "dtos/operations/AccountOperationDto";
import Account from "models/Account";
import AccountStatus from "models/enums/AccountStatus";
import Operation from "models/enums/Operation";
import AccountOperation from "models/operations/AccountOperation";
import AccountRepository from "repository/AccountRepository";

jest.mock('repository/AccountRepository');

describe('Testing Account Operation Receiver', () =>{
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Do Account Operation with success', async () =>{

        const operationDto = getAccountOperationDto();
        const account = getAccount();

        const updateAccountSpy = jest.spyOn(AccountRepository, 'updateAccount').mockImplementation(async () => {});
        const saveAccountOperationSpy = jest.spyOn(AccountRepository, 'saveOperation').mockImplementation(async () => getAccountOperation());
        
        const accountDetail = await AccountOperationReceiver.execute(operationDto, account);
        
        expect(updateAccountSpy).toBeCalledTimes(1);
        expect(saveAccountOperationSpy).toBeCalledTimes(1);
        expect(accountDetail).toBeDefined();
        expect(accountDetail.account.document).toEqual(account.document);
        expect(accountDetail.account.status).toEqual(AccountStatus.ACTIVE);
    });


    test('Do Account Operation with success and set receiver with correct value', async() =>{

        const operationDto = getAccountOperationDto();
        const account = getAccount();

        operationDto.receiver = "receiver-test";

        const updateAccountSpy = jest.spyOn(AccountRepository, 'updateAccount').mockImplementation(async () => {});
        const saveAccountOperationSpy = jest.spyOn(AccountRepository, 'saveOperation').mockImplementation(async () => getAccountOperation());

        const accountDetail = await AccountOperationReceiver.execute(operationDto, account);

        const operation: AccountOperation = saveAccountOperationSpy.mock.calls[0][0];

        expect(updateAccountSpy).toBeCalledTimes(1);
        expect(saveAccountOperationSpy).toBeCalledTimes(1);
        expect(accountDetail).toBeDefined();
        expect(accountDetail.account.document).toEqual(account.document);
        expect(accountDetail.account.status).toEqual(AccountStatus.ACTIVE);
        expect(operation.amount).toEqual(operationDto.amount);
        expect(operation.receiver).toEqual(operationDto.receiver);
    });


    test('Do Account Operation with success and set payer with correct value', async() =>{

        const operationDto = getAccountOperationDto();
        const account = getAccount();

        operationDto.payer = "payer-test";

        const updateAccountSpy = jest.spyOn(AccountRepository, 'updateAccount').mockImplementation(async () => {});
        const saveAccountOperationSpy = jest.spyOn(AccountRepository, 'saveOperation').mockImplementation(async () => getAccountOperation());

        const accountDetail = await AccountOperationReceiver.execute(operationDto, account);

        const operation: AccountOperation = saveAccountOperationSpy.mock.calls[0][0];

        expect(updateAccountSpy).toBeCalledTimes(1);
        expect(saveAccountOperationSpy).toBeCalledTimes(1);
        expect(accountDetail).toBeDefined();
        expect(accountDetail.account.document).toEqual(account.document);
        expect(accountDetail.account.status).toEqual(AccountStatus.ACTIVE);
        expect(operation.amount).toEqual(operationDto.amount);
        expect(operation.payer).toEqual(operationDto.payer);
    });

})


function getAccountOperation(): AccountOperation{
    return {
        id: "id-test",
        document:"doc-test",
        operation: Operation.DEPOSIT,
        type: AccountOperation.name.toUpperCase(),
        amount: 100,
        date: (new Date().toString()),
        receiver: null,
        payer: null
    }
}

function getAccountOperationDto(): AccountOperationDto{
    return {
        document: "doc-test",
        amount: 100,
        type: Operation.DEPOSIT,
        tenant: "tenant-test",
        receiver: undefined,
        payer: undefined
    }
}

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
