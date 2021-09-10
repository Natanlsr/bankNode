import CreateAccountCommand from "commands/write-commands/CreateAccountCommand";
import Account from "models/Account";
import AccountStatus from "models/enums/AccountStatus";
import Operation from "models/enums/Operation";
import AccountRepository from "repository/AccountRepository";

jest.mock('repository/AccountRepository');

describe('Testing Create Account Command', () =>{
    test('Create Account with success', async () =>{

        const createAccountDto = getCreateAccountDto();
    
        const accountDetail = await CreateAccountCommand.execute(createAccountDto);
        
        expect(accountDetail).toBeDefined();
        expect(accountDetail.account.document).toEqual(createAccountDto.document);
        expect(accountDetail.account.balance).toEqual(createAccountDto.balance);
        expect(accountDetail.account.status).toEqual(AccountStatus.ACTIVE);
        expect(AccountRepository.saveAccount).toBeCalledTimes(1);
    });

    test('Should throw error because account already exists', async () =>{

        const createAccountDto = getCreateAccountDto();
            
       jest.spyOn(AccountRepository, 'getAccount').mockImplementation(async () => getAccount());

        CreateAccountCommand.execute(createAccountDto).catch(e =>
            expect(e).toEqual({
              error: 'Account already exists',
            }),
        );
    });
})

function getCreateAccountDto(){
    return {
        document: "doc-test",
        balance: 10,
        type: Operation.CREATE_ACCOUNT,
        tenant: 'tenant'
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
