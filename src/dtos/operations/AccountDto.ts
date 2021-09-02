import BaseDto from "dtos/BaseDto";
import Operation from "models/enums/Operation";
import Account from "../../models/Account";

class AccountDto extends BaseDto{
    document: string;
    balance: number;

    constructor(document: string, balance: number, type: Operation) {
        super(type);
        this.document = document;
        this.balance = balance;
    }
}

export function toAccountDto(accountOperation: Account): AccountDto{
    return {
        document: accountOperation.customerDocument,
        balance: accountOperation.balance,
        type: Operation.CREATE_ACCOUNT
    }
}
export default AccountDto;
