import BaseDto from "../BaseDto";
import TransactionDto from "./TransactionDto";
import Operation from "../../models/enums/Operation";
import AccountOperation from "../../models/operations/AccountOperation";


class TransferDto extends BaseDto{
    transaction?: TransactionDto;

    constructor(transaction: TransactionDto, type: Operation, tenant: string) {
        super(type, tenant);
        this.transaction = transaction;
    }
}

export function toTransferDto(transfer: AccountOperation): TransferDto{
    return {
        transaction: {
            id: transfer.id,
            payer: transfer.payer,
            receiver: transfer.receiver,
            amount: transfer.amount
        },
        type: Operation.TRANSFER,
        tenant: null
    }
}

export default TransferDto;
