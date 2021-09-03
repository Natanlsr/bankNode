import Command from "../commands/Command";
import datas from "../../input/data.json";
import CreateAccountCommand from "commands/write-commands/CreateAccountCommand";
import Operation from "models/enums/Operation";
import DepositCommand from "commands/write-commands/DepositCommand";
import AccountOperationDto from "dtos/operations/AccountOperationDto";
import WithdrawCommand from "commands/write-commands/WithdrawCommand";
import AccountDto from "dtos/AccountDto";
import GetAccountCommand from "commands/read-commands/GetAccountCommand";
import QueryDto from "dtos/operations/QueryDto";
import TransferCommand from "commands/write-commands/TransferCommand";
import TransferDto from "dtos/operations/TransferDto";

class CommandInvoker{
    executeCommands(){
        const acceptedCommands={
            CREATE_ACCOUNT: (command: AccountDto) => CreateAccountCommand.execute(command),
    
            DEPOSIT: (command: AccountOperationDto) => DepositCommand.execute(command),
    
            WITHDRAW: (command: AccountOperationDto) => WithdrawCommand.execute(command),
    
            TRANSFER: (command: TransferDto) => TransferCommand.execute(command),
    
            EXTRACT: (command: QueryDto) => GetAccountCommand.execute(command),
    
            BALANCE: (command: QueryDto) => GetAccountCommand.execute(command),
        }

       datas.forEach(function(command){
           try{
            const type: Operation = Operation[command.type as Operation];
            const accountDetails = acceptedCommands[type](command);
            console.log(accountDetails);
            console.log('-------------------------------------------------');
           }catch(error){
               console.log('Error processing account:', command.document);
           }
           
       })
    }
}

export default CommandInvoker;
