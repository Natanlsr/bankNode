
import AccountDetailsDto from "../../dtos/AccountDetailsDto";
import AccountOperationDto from "../../dtos/operations/AccountOperationDto";
import AccountRepository from "../../repository/AccountRepository";
import Command from "../Command";
import AccountOperationReceiver from "../write-commands/AccountOperationReceiver";

class WithdrawCommand implements Command {

    async execute(command: AccountOperationDto): Promise<AccountDetailsDto> {
        const account = await AccountRepository.getAccount(command.document!!, command.tenant!!);

        if(!account){
            throw Error;
        }

        if(command.amount!! <= 0 || account.balance <= 0 || account.balance < command.amount!!){
           throw Error(`Amount Invalid: ${command.amount}`); 
        }

        command.amount = -Math.abs(command.amount!!);
        const result = await AccountOperationReceiver.execute(command, account);

        return result;
    }
    
}

export default new WithdrawCommand();
