import { DynamoDbConfig } from "config/DynamoDbConfig"


describe('Testing DynamoDb Config', () => {
    test('Get dynamoDb config to localhost with success', () => {
        const config = DynamoDbConfig.getDynamoClient();

        expect(config).toBeDefined();
    })
})
