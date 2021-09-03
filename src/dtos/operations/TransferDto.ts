import BaseDto from "../BaseDto";
import TransactionDto from "./TransactionDto";
import Transaction from "../../models/operations/Transaction";
import Operation from "models/enums/Operation";


class TransferDto extends BaseDto{
    transaction?: TransactionDto;

    constructor(transaction: TransactionDto, type: Operation) {
        super(type);
        this.transaction = transaction;
    }
}

export function toTransferDto(transfer: Transaction): TransferDto{
    return {
        transaction: {
            id: transfer.id,
            payer: transfer.payer,
            receiver: transfer.receiver,
            amount: transfer.amount
        },
        type: Operation.TRANSFER
    }
}

export default TransferDto;
