import CreateAccountDto from '../../dtos/operations/CreateAccountDto';
import AccountRepository from '../../repository/AccountRepository';
import { v4 as uuidv4 } from 'uuid';
import AccountDetailsDto, { toAccountDetailsDto } from '../../dtos/AccountDetailsDto';
import Account from "../../models/Account";
import AccountStatus from "../../models/enums/AccountStatus";
import Command from "../Command";

class CreateAccountCommand implements Command {

    async execute(command: CreateAccountDto): Promise<AccountDetailsDto> {
        const accountFinded = await AccountRepository.getAccount(command.document!!, command.tenant!!);

        if(accountFinded){
            throw Error('Account already exists');
        }

        const id = uuidv4()
        const account: Account = {
            id: id,
            document: command.document!,
            type: Account.name.toUpperCase(),
            balance: command.balance!!,
            status: AccountStatus.ACTIVE.toString(),
            creationDate: (new Date()).toString()
        };
        await AccountRepository.saveAccount(account, command.tenant!!);

        return toAccountDetailsDto(account);
    }
    
}

export default new CreateAccountCommand();
