import Account from "../models/Account";
import AccountOperation from "../models/operations/AccountOperation";
import Transaction from "../models/operations/Transaction";
import AccountDto, { toAccountDto } from "./AccountDto";
import AccountOperationDto, { toAccountOperationDto } from "./operations/AccountOperationDto";
import TransferDto, { toTransferDto } from "./operations/TransferDto";

class AccountDetailsDto{
    account: AccountDto;
    operations?: Array<AccountOperationDto>;
    tranfers?: Array<TransferDto>;

    constructor(
        account: AccountDto,
        operations: Array<AccountOperationDto>, 
        tranfers: Array<TransferDto>
    ){
        this.account = account;
        this.operations = operations;
        this.tranfers = tranfers;
    }
}

export function toAccountDetailsDto(
    account: Account, 
    operations?: Array<AccountOperation>, 
    transfers?: Array<Transaction>
): AccountDetailsDto{
    return {
        account: toAccountDto(account),
        operations: operations?.map(toAccountOperationDto),
        tranfers: transfers?.map(toTransferDto)
    }
}

export default AccountDetailsDto;


