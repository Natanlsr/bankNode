
import AccountOperation from "models/operations/AccountOperation";
import { v4 as uuidv4 } from 'uuid';
import AccountRepository from "repository/AccountRepository";
import AccountDetailsDto, { toAccountDetailsDto } from "../../dtos/AccountDetailsDto";
import AccountOperationDto from "../../dtos/operations/AccountOperationDto";
import Command from "../Command";
import Account from "models/Account";

class AccountOperationReceiver{

    async execute(command: AccountOperationDto, account: Account): Promise<AccountDetailsDto> {
        account.balance += command.amount!!;
        const id = uuidv4();
        
        const operation: AccountOperation = {
            id: id,
            document: command.document!!,
            operation: command.type,
            type: AccountOperation.name.toUpperCase(),
            amount: Math.abs(command.amount!!),
            date: (new Date()).toString(),
            receiver: command.receiver? command.receiver : "",
            payer: command.payer? command.payer : ""
        }

        await AccountRepository.updateAccount(account, command.tenant!!);
        await AccountRepository.saveOperation(operation, command.tenant!!);

        return toAccountDetailsDto(account);
    }
    
}

export default new AccountOperationReceiver();
