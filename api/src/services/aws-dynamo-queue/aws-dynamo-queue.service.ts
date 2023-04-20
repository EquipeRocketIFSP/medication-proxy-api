import {Injectable} from '@nestjs/common';
import {AttributeValue, DynamoDB} from "@aws-sdk/client-dynamodb";
import * as process from "process";

@Injectable()
export class AWSDynamoQueueService {
    private dynamo: DynamoDB;

    constructor() {
        this.dynamo = new DynamoDB({
            region: process.env.AWS_DYNAMO_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        });
    }

    public async add(registerNumber: string): Promise<void> {
        await this.dynamo.putItem({
            TableName: process.env.AWS_DYNAMO_TABLE,
            Item: {
                registerNumber: {
                    S: String(registerNumber)
                }
            }
        });
    }

    public async delete(registerNumber: string): Promise<void> {
        await this.dynamo.deleteItem({
            TableName: process.env.AWS_DYNAMO_TABLE,
            Key: {
                registerNumber: {
                    S: registerNumber
                }
            }
        });
    }

    public async getAll(): Promise<Record<string, AttributeValue>[]> {
        const {Items} = await this.dynamo.scan({TableName: process.env.AWS_DYNAMO_TABLE});

        return Items;
    }
}
