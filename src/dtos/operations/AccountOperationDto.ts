import AccountOperation from "../../models/operations/AccountOperation";
import BaseDto from "../BaseDto";

class AccountOperationDto extends BaseDto{
    document: string;
    amount: number;

    constructor(document: string, amount: number, type: Operation) {
        super(type);
        this.document = document;
        this.amount = amount;
    }
}

export function toAccountOperationDto(accountOperation: AccountOperation): AccountOperationDto{
    return {
        document: accountOperation.accountId,
        amount: accountOperation.amount,
        type: accountOperation.operation
    }
}
export default AccountOperationDto;
