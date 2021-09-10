import GetAccountCommand from "commands/read-commands/GetAccountCommand";
import Account from "models/Account";
import AccountDetails from "models/AccountDetails";
import AccountStatus from "models/enums/AccountStatus";
import Operation from "models/enums/Operation";
import AccountRepository from "repository/AccountRepository";

jest.mock('repository/AccountRepository');

describe('Testing Get Account Commad', () =>{
    test('Get account with success', async () => {
        const queryDto = getQueryDto();
        const account = getAccount();

        const getAccountDetailSpy = jest.spyOn(AccountRepository, 'getFullAccountInformations').mockImplementation(async() => getAccountDetails());

        const accountDetails = await GetAccountCommand.execute(queryDto)

        expect(getAccountDetailSpy).toHaveBeenCalledTimes(1);
        expect(accountDetails.account.document).toEqual(account.document);
        expect(accountDetails.account.status).toEqual(account.status);
    });
})

function getAccountDetails(): AccountDetails{
    return {
        account: getAccount(),
        operations: []
    }
}


function getAccount(): Account{
    return {
        id: "id-test",
        document: "doc-test",
        type: Account.name.toUpperCase(),
        balance: 100,
        status: AccountStatus.ACTIVE,
        creationDate: (new Date()).toString()
    }
}

function getQueryDto(){
    return {
        document: "document-test",
        type: Operation.EXTRACT,
        tenant: "tenant-test"
    }
}
