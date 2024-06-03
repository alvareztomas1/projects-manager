import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { authSample, errorSample } from 'src/utils/test.utils';

describe('AuthController', () => {
  let app: INestApplication;
  const authService = {
    signIn: () => 'accessToken',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('login', () => {
    it('should return the value obtained by the auth service', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(authSample)
        .expect(201)
        .expect(authService.signIn());
    });

    it('should throw an error when the sign in fails', async () => {
      jest.spyOn(authService, 'signIn').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(authSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
