import {Module} from '@nestjs/common';
import {MedicationController} from './controllers/medication/medication.controller';
import {AnvisaApiService} from './services/anvisa-api/anvisa-api.service';
import {MedicationService} from './services/medication/medication.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfigModule} from "@nestjs/config";
import {AWSDynamoQueueService} from './services/aws-dynamo-queue/aws-dynamo-queue.service';
import * as process from "process";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),

        ConfigModule.forRoot({
            envFilePath: ['.env.development', '.env']
        }),

        MikroOrmModule.forRoot({
            entities: ['dist/models'],
            entitiesTs: ['src/models'],
            dbName: process.env.DB_NAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
            autoLoadEntities: true,
            type: 'mysql'
        })
    ],
    controllers: [MedicationController],
    providers: [AnvisaApiService, MedicationService, AWSDynamoQueueService],
})
export class AppModule {
}
