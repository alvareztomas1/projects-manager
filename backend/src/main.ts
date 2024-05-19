import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(ConfigModule);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix('api');
  app.enableCors(CORS);

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.use(morgan('dev'));

  await app.listen(configService.get('PORT') || 8080);
  console.log(`App listening to port ${configService.get('PORT')}`);
}
bootstrap();
