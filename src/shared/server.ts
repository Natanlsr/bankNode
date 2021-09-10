import { DynamoDbConfig } from 'config/DynamoDbConfig';
import CommandInvoker from '../handle/CommandInvoker';

async function handler(){
    await new CommandInvoker().executeCommands();
};

handler();
