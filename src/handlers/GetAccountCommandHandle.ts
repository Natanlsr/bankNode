import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import Operation from '../models/enums/Operation';
import QueryDto from '../dtos/operations/QueryDto';
import GetAccountCommand from '../commands/read-commands/GetAccountCommand';


export const getAccountCommandHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`GetMethod only accepts GET method, you tried: ${event.httpMethod} method.`);
    }

    if(!event.headers.Tenant){
        throw Error("Tenant is required");
    }

    if(!event.pathParameters?.document){
        throw Error("Document is required");
    }

    const queryCommand = new QueryDto(event.pathParameters?.document, Operation.EXTRACT, event.headers.Tenant);

    let response = {
        statusCode: 200,
        body: ""
    }

    try{
        const account = await GetAccountCommand.execute(queryCommand);
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
