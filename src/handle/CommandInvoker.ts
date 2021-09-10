import datas from '../../input/data.json';
import CreateAccountCommand from 'commands/write-commands/CreateAccountCommand';
import Operation from 'models/enums/Operation';
import DepositCommand from 'commands/write-commands/DepositCommand';
import AccountOperationDto from 'dtos/operations/AccountOperationDto';
import WithdrawCommand from 'commands/write-commands/WithdrawCommand';
import GetAccountCommand from 'commands/read-commands/GetAccountCommand';
import QueryDto from 'dtos/operations/QueryDto';
import TransferCommand from 'commands/write-commands/TransferCommand';
import TransferDto from 'dtos/operations/TransferDto';
import CreateAccountDto from 'dtos/operations/CreateAccountDto';

class CommandInvoker {
    async executeCommands() {
        const acceptedCommands = {
            CREATE_ACCOUNT: (command: CreateAccountDto) =>
                CreateAccountCommand.execute(command),

            DEPOSIT: (command: AccountOperationDto) =>
                DepositCommand.execute(command),

            WITHDRAW: (command: AccountOperationDto) =>
                WithdrawCommand.execute(command),

            TRANSFER: (command: TransferDto) =>
                TransferCommand.execute(command),

            EXTRACT: (command: QueryDto) => GetAccountCommand.execute(command),

            BALANCE: (command: QueryDto) => GetAccountCommand.execute(command),
        };

        for await (const command of datas) {

            try{
                const type: Operation = Operation[command.type as Operation];
                const accountDetails = await acceptedCommands[type](command);
                console.log(accountDetails);
                console.log('-------------------------------------------------');
               }catch(error){
                   console.log('Error processing account:', command.document);
                   continue;
               }
        }
    }
}

export default CommandInvoker;
