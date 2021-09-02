
import AccountDetailsDto, { toAccountDetailsDto } from "../../dtos/AccountDetailsDto";
import AccountOperationDto from "../../dtos/operations/AccountOperationDto";
import { AccountRepository } from "../../repository/AccountRepository";
import { OperationRepository } from "../../repository/OperationRepository";
import Command from "../Command";

class WithdrawCommand implements Command {

    execute(command: AccountOperationDto): AccountDetailsDto {
        const account = AccountRepository.getAccount(command.document);

        if(!account){
            console.error('Account not exists', command.document);
            throw Error;
        }

        if(command.amount > 0 && account.balance > 0 && command.amount <= account.balance){
           console.error('Withdraw not supported');
           throw Error; 
        }

        account.balance -= command.amount;
        const operation = {
            accountId: command.document,
            operation: command.type,
            amount: command.amount,
            date: new Date()
        }

        AccountRepository.updateAccount(account);
        OperationRepository.saveOperation(operation)

        return toAccountDetailsDto(account, [operation]);
    }
    
}

export default new WithdrawCommand();
