
import TransferDto from "dtos/operations/TransferDto";
import AccountDetailsDto from "../../dtos/AccountDetailsDto";
import Command from "../Command";
import WithdrawCommand from "./WithdrawCommand";
import Operation from "models/enums/Operation";
import DepositCommand from "./DepositCommand";

class TransferCommand implements Command {

    async execute(command: TransferDto): Promise<AccountDetailsDto> {

        if(!command.transaction || !command.transaction.receiver || !command.transaction.payer){
            throw Error('Command invalid');
        }

        const accountPayer = await WithdrawCommand.execute(
            {
                document: command.transaction.payer,
                amount: command.transaction.amount,
                type: Operation.TRANSFER.toString(),
                receiver: command.transaction.receiver,
                payer: '',
                tenant: command.tenant
            }
        )

        await DepositCommand.execute(
            {
                document: command.transaction.receiver,
                amount: command.transaction.amount,
                type: Operation.TRANSFER.toString(),
                payer: command.transaction.payer,
                receiver: '',
                tenant: command.tenant
            }
        )
        return accountPayer;
    }
    
}

export default new TransferCommand();
