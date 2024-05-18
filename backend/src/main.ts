import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(ConfigModule);

  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  app.use(morgan('dev'));

  await app.listen(configService.get('PORT') || 8080);
  console.log(`App listening to port ${configService.get('PORT')}`);
}
bootstrap();
