import AccountDto from 'dtos/operations/AccountDto';
import { v4 as uuidv4 } from 'uuid';
import AccountDetailsDto, { toAccountDetailsDto } from '../../dtos/AccountDetailsDto';
import AccountOperationDto from '../../dtos/operations/AccountOperationDto';
import Account from "../../models/Account";
import AccountStatus from "../../models/enums/AccountStatus";
import { AccountRepository } from "../../repository/AccountRepository";
import Command from "../Command";

class CreateAccountCommand implements Command {

    execute(command: AccountDto): AccountDetailsDto {
        const account: Account = {
            id: uuidv4(),
            customerDocument: command.document,
            balance: command.balance,
            status: AccountStatus.ACTIVE,
            creationDate: new Date()
        };
        AccountRepository.saveAccount(account);

        return toAccountDetailsDto(account);
    }
    
}

export default new CreateAccountCommand();
