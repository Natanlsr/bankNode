import AccountOperationReceiver from "commands/write-commands/AccountOperationReceiver";
import WithdrawCommand from "commands/write-commands/WithdrawCommand";
import { toAccountDetailsDto } from "dtos/AccountDetailsDto";
import Account from "models/Account";
import AccountStatus from "models/enums/AccountStatus";
import Operation from "models/enums/Operation";
import AccountRepository from "repository/AccountRepository";

jest.mock('repository/AccountRepository');

jest.mock('commands/write-commands/AccountOperationReceiver');

describe('Testing Withdraw Command', () =>{
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Do Withdraw Command with success', async () =>{

        const withdrawCommandDto = getAccountOperationDto();
        const accountDto = await getAccount();

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async() => getAccount());
        const accountOperationSpy = jest.spyOn(AccountOperationReceiver, 'execute').mockImplementation(getAccountDetailsDto);
        
        const accountDetail = await WithdrawCommand.execute(withdrawCommandDto);
        
        expect(getAccountSpy).toBeCalledTimes(1);
        expect(accountOperationSpy).toBeCalledTimes(1);
        expect(accountDetail).toBeDefined();
        expect(accountDetail.account.document).toEqual(accountDto.document);
        expect(accountDetail.account.status).toEqual(AccountStatus.ACTIVE);
    });


    test('Throw error because account account not exists', () =>{

        const withdrawCommandDto = getAccountOperationDto();

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async () => undefined);

        WithdrawCommand.execute(withdrawCommandDto).catch(e =>
            expect(e).toEqual({
              error: 'Account not exists',
            }),
        );
        expect(getAccountSpy).toBeCalledTimes(1);

    });


    test('Throw error because ammount of command is negative', () =>{

        const withdrawCommandDto = getAccountOperationDto();
        withdrawCommandDto.amount = -1;

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async() => getAccount());

        WithdrawCommand.execute(withdrawCommandDto).catch(e =>
            expect(e).toEqual({
              error: 'Amount Invalid',
            }),
        );
        expect(getAccountSpy).toBeCalledTimes(1);

    });

    test('Throw error because ammount of command is zero', () =>{

        const withdrawCommandDto = getAccountOperationDto();
        withdrawCommandDto.amount = 0;

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async() => getAccount());

        WithdrawCommand.execute(withdrawCommandDto).catch(e =>
            expect(e).toEqual({
              error: 'Amount Invalid',
            }),
        );
        expect(getAccountSpy).toBeCalledTimes(1);

    });

    test('Throw error because balance of account less withdraw amount', () =>{

        const withdrawCommandDto = getAccountOperationDto();
        const account = getAccount();
        account.balance = 0;

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async() => account);

        WithdrawCommand.execute(withdrawCommandDto).catch(e =>
            expect(e).toEqual({
              error: 'Amount Invalid',
            }),
        );
        expect(getAccountSpy).toBeCalledTimes(1);

    });

    test('Throw error because balance of account is zero', () =>{

        const withdrawCommandDto = getAccountOperationDto();
        const account = getAccount();
        account.balance = 0;

        const getAccountSpy = jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async() => account);

        WithdrawCommand.execute(withdrawCommandDto).catch(e =>
            expect(e).toEqual({
              error: 'Amount Invalid',
            }),
        );
        expect(getAccountSpy).toBeCalledTimes(1);

    });
})

function getAccountOperationDto(){
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

async function getAccountDetailsDto(){
    return toAccountDetailsDto(await getAccount())
}
