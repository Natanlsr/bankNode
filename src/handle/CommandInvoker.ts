import Command from "../commands/Command";
import datas from "../../input/data.json";
import BaseDto from "dtos/BaseDto";
import AccountOperationDto from "dtos/operations/AccountOperationDto";
import CreateAccountCommand from "commands/write-commands/CreateAccountCommand";
import AccountDetailsDto from "dtos/AccountDetailsDto";
import Operation from "models/enums/Operation";
import AccountDto from "dtos/operations/AccountDto";

class CommandInvoker{
    executeCommands(){
        const acceptedCommands={
            CREATE_ACCOUNT: (command: AccountDto) => CreateAccountCommand.execute(command),
    
            DEPOSIT: 
            function(command: string): CommandToExecute{
                const dto: AccountOperationDto = JSON.parse(command)
                return {
                    command: CreateAccountCommand,
                    dto: dto
                }
            },
    
            WITHDRAW: 
            function(command: string): CommandToExecute{
                const dto: AccountOperationDto = JSON.parse(command)
                return {
                    command: CreateAccountCommand,
                    dto: dto
                }
            },
    
            TRANSFER: 
            function(command: string): CommandToExecute{
                const dto: AccountOperationDto = JSON.parse(command)
                return {
                    command: CreateAccountCommand,
                    dto: dto
                }
            },
    
            EXTRACT: 
            function(command: string): CommandToExecute{
                const dto: AccountOperationDto = JSON.parse(command)
                return {
                    command: CreateAccountCommand,
                    dto: dto
                }
            },
    
            BALANCE: 
            function(command: string): CommandToExecute{
                const dto: AccountOperationDto = JSON.parse(command)
                return {
                    command: CreateAccountCommand,
                    dto: dto
                }
            }
        }

       datas.forEach(function(command){
           const type = Operation[command.type];
           const accountDetails = acceptedCommands[type](command)
           console.log(accountDetails);
       })
    }
}

class CommandToExecute{
    command: Command;
    dto: BaseDto;

    constructor(command: Command, dto: BaseDto){
        this.command = command;
        this.dto = dto;
    }
}

export default CommandInvoker;
