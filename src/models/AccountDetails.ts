import Account from "./Account";
import AccountOperation from "./operations/AccountOperation";

class AccountDetails{
    account: Account;
    operations: Array<AccountOperation>;

    constructor(account: Account, operations: Array<AccountOperation>){
        this.account = account;
        this.operations = operations;
    }

}

export default AccountDetails;
