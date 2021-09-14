import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import CreateAccountDto from '../dtos/operations/CreateAccountDto';
import CreateAccountCommand from '../commands/write-commands/CreateAccountCommand';


export const createAccountHandler = async (
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

    const createAccountDto = JSON.parse(event.body) as CreateAccountDto;
    createAccountDto.tenant = event.headers.Tenant;

    let response = {
        statusCode: 201,
        body: ""
    }

    try{
        const account = await CreateAccountCommand.execute(createAccountDto);
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
