import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import Operation from '../models/enums/Operation';
import TransferDto from '../dtos/operations/TransferDto';
import TransferCommand from '../commands/write-commands/TransferCommand';


export const transferCommandHandler = async (
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

    const transferCommand = JSON.parse(event.body) as TransferDto;
    transferCommand.tenant = event.headers.Tenant;
    transferCommand.type = Operation.TRANSFER;

    let response = {
        statusCode: 200,
        body: ""
    }

    try{
        const account = await TransferCommand.execute(transferCommand);
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
