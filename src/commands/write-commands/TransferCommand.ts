
import TransferDto from "dtos/operations/TransferDto";
import AccountDetailsDto, { toAccountDetailsDto } from "../../dtos/AccountDetailsDto";
import { AccountRepository } from "../../repository/AccountRepository";
import { TransactionRepository } from "repository/TransactionRepository";
import Command from "../Command";
import WithdrawCommand from "./WithdrawCommand";
import Operation from "models/enums/Operation";
import DepositCommand from "./DepositCommand";
import Transaction from "models/operations/Transaction";

class TransferCommand implements Command {

    execute(command: TransferDto): AccountDetailsDto {

        if(!command.transaction ){
            console.error('Command Invalid');
            throw Error;
        }

        const accountPayer = AccountRepository.getAccount(command.transaction.payer);
        const accountReceiver = AccountRepository.getAccount(command.transaction.receiver);

        if(!accountPayer || !accountReceiver){
            console.log("Account Not Found");
            throw Error;
        }

        WithdrawCommand.execute(
            {
                document: accountPayer?.customerDocument,
                amount: command.transaction!!.amount!!,
                type: Operation.WITHDRAW.toString()
            }
        )

        DepositCommand.execute(
            {
                document: accountReceiver?.customerDocument,
                amount: command.transaction!!.amount!!,
                type: Operation.DEPOSIT.toString()
            }
        )

        const transaction: Transaction = {
            id: command.transaction.id,
            payer: command.transaction.payer,
            receiver: command.transaction.receiver,
            amount: command.transaction.amount,
            operationDate: new Date()
        }

        TransactionRepository.saveTransaction(command.transaction.payer, transaction);
        TransactionRepository.saveTransaction(command.transaction.receiver, transaction);

        return toAccountDetailsDto(accountPayer);
    }
    
}

export default new TransferCommand();
