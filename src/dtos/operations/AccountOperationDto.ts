import Operation from "models/enums/Operation";
import AccountOperation from "../../models/operations/AccountOperation";
import BaseDto from "../BaseDto";

class AccountOperationDto extends BaseDto{
    document?: string;
    amount?: number;
    receiver?: string;
    payer?: string;

    constructor(document: string, amount: number, type: Operation, receiver: string, payer: string, tenant: string) {
        super(type, tenant);
        this.document = document;
        this.amount = amount;
        this.receiver = receiver;
        this.payer = payer;
    }
}

export function toAccountOperationDto(accountOperation: AccountOperation): AccountOperationDto{
    return {
        document: accountOperation.document,
        amount: accountOperation.amount,
        type: accountOperation.operation,
        receiver: accountOperation.receiver? accountOperation.receiver: undefined,
        payer: accountOperation.payer? accountOperation.payer: undefined,
        tenant: null
    }
}
export default AccountOperationDto;
