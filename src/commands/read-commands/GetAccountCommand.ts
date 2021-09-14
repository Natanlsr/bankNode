import QueryDto from '../../dtos/operations/QueryDto';
import AccountDetailsDto, { toAccountDetailsDto } from '../../dtos/AccountDetailsDto';
import AccountRepository from "../../repository/AccountRepository";
import Command from "../Command";

class GetAccountCommand implements Command {

    async execute(command: QueryDto): Promise<AccountDetailsDto> {
        const accountDetails = await AccountRepository.getFullAccountInformations(command.document!!, command.tenant!!);
        return toAccountDetailsDto(accountDetails.account, accountDetails.operations);
    }
    
}

export default new GetAccountCommand();
