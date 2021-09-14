
import { DynamoDBClient} from '@aws-sdk/client-dynamodb';

export namespace DynamoDbConfig{
    
    export function getDynamoClient(): DynamoDBClient{
        return new DynamoDBClient({ 
            region: 'us-east-1',
            endpoint: 'http://192.168.100.235:8000',
            credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' }
          });
        
    }

}
