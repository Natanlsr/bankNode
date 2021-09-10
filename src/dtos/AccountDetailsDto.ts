import Account from "../models/Account";
import AccountOperation from "../models/operations/AccountOperation";
import AccountDto, { toAccountDto } from "./AccountDto";
import AccountOperationDto, { toAccountOperationDto } from "./operations/AccountOperationDto";

class AccountDetailsDto{
    account: AccountDto;
    operations?: Array<AccountOperationDto>;

    constructor(
        account: AccountDto,
        operations: Array<AccountOperationDto>
    ){
        this.account = account;
        this.operations = operations;
    }
}

export function toAccountDetailsDto(
    account: Account, 
    operations?: Array<AccountOperation>
): AccountDetailsDto{
    return {
        account: toAccountDto(account),
        operations: operations?.map(toAccountOperationDto)
        }
}

export default AccountDetailsDto;


