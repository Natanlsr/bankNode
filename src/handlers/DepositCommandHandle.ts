import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import AccountOperationDto from '../dtos/operations/AccountOperationDto';
import DepositCommand from '../commands/write-commands/DepositCommand';
import Operation from '../models/enums/Operation';


export const depositCommandHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    
    if(!event.body){
        throw Error("Body is required");
    };
    
    if(!event.headers.Tenant){
        throw Error("Tenant is required");
    }

    console.log(JSON.parse(event.body));
    
    const depositCommand = JSON.parse(event.body) as AccountOperationDto;
    depositCommand.tenant = event.headers.Tenant;
    depositCommand.type = Operation.DEPOSIT;

    let response = {
        statusCode: 200,
        body: ""
    }

    try{
        const account = await DepositCommand.execute(depositCommand);
        response.body = JSON.stringify(account);

    }catch(error){
        response = {
            statusCode: 400,
            body: JSON.stringify({error: (error as Error).message })
        };
    }
    
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
