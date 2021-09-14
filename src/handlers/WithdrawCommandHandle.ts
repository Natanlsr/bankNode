import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import AccountOperationDto from '../dtos/operations/AccountOperationDto';
import Operation from '../models/enums/Operation';
import WithdrawCommand from '../commands/write-commands/WithdrawCommand';


export const withdrawCommandHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.log(event.body);
    
    if(!event.body){
        throw Error("Body is required");
    };
    
    if(!event.headers.Tenant){
        throw Error("Tenant is required");
    }

    const withdrawCommand = JSON.parse(event.body) as AccountOperationDto;
    withdrawCommand.tenant = event.headers.Tenant;
    withdrawCommand.type = Operation.WITHDRAW;

    let response = {
        statusCode: 200,
        body: ""
    }

    try{
        const account = await WithdrawCommand.execute(withdrawCommand);
        response.body = JSON.stringify(account)

    }catch(error){
        response = {
            statusCode: 400,
            body: JSON.stringify({error: (error as Error).message })
        };
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode!!} body: ${response.body}`);
    return response;
}
