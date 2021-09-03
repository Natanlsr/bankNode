import QueryDto from 'dtos/operations/QueryDto';
import { OperationRepository } from 'repository/OperationRepository';
import { TransactionRepository } from 'repository/TransactionRepository';
import AccountDetailsDto, { toAccountDetailsDto } from '../../dtos/AccountDetailsDto';
import { AccountRepository } from "../../repository/AccountRepository";
import Command from "../Command";

class GetAccountCommand implements Command {

    execute(command: QueryDto): AccountDetailsDto {
        const account = AccountRepository.getAccount(command.document!!);
        const operations = OperationRepository.getOperations(command.document!!);
        const transfers = TransactionRepository.getTransactions(command.document!!);

        if(!account){
            console.error('Account not exists');
            throw Error;
        }

        return toAccountDetailsDto(account, operations, transfers);
    }
    
}

export default new GetAccountCommand();
