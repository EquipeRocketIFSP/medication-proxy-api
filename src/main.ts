import {NestFactory} from '@nestjs/core';
import {createServer} from 'aws-serverless-express';

import {AppModule} from './app.module';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    //return createServer(app);
}

bootstrap();
