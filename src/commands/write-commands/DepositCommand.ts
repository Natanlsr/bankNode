
import AccountDetailsDto, { toAccountDetailsDto } from "../../dtos/AccountDetailsDto";
import AccountOperationDto from "../../dtos/operations/AccountOperationDto";
import AccountRepository from "repository/AccountRepository";
import Command from "../Command";
import AccountOperationReceiver from "./AccountOperationReceiver";

class DepositCommand implements Command {

    async execute(command: AccountOperationDto): Promise<AccountDetailsDto> {
        const account = await AccountRepository.getAccount(command.document!!, command.tenant!!);
        
        if(!account){
            throw Error('Account not exists');
        }

        if(command.amount!! <= 0){ 
           console.error('Deposit not supported');
           throw Error('Amount Invalid'); 
        }

        const result = await AccountOperationReceiver.execute(command, account);

        return result;
    }
    
}

export default new DepositCommand();
