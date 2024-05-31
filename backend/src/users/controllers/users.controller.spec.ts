import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  userSample,
  guardMock,
  uuidSample,
  errorSample,
} from 'src/utils/test.utils';
import { RolesGuard } from 'src/auth/guards/roles.guard';

describe('UsersController', () => {
  let app: INestApplication;
  const usersService = {
    findAll: () => ['users'],
    findById: () => 'user',
    delete: () => 'user deleted',
    updateUser: () => 'user edited',
    create: () => userSample,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RolesGuard)
      .useValue(guardMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      return request(app.getHttpServer())
        .get('/users/find-all')
        .expect(200)
        .expect(usersService.findAll());
    });

    it('should throw an error when gettin all users fails', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .get('/users/find-all')
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('findById', () => {
    it('should get an user', async () => {
      return request(app.getHttpServer())
        .get(`/users/find/${uuidSample}`)
        .expect(200)
        .expect(usersService.findById());
    });

    it('should throw an error when gettin all users fails', async () => {
      jest.spyOn(usersService, 'findById').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .get(`/users/find/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('create', () => {
    it('should get a created user', async () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .send(userSample)
        .expect(201)
        .expect(userSample);
    });

    it('should throw an error when creating a user fails', async () => {
      jest.spyOn(usersService, 'create').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .post('/users/create')
        .send(userSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('delete', () => {
    it('should receive a delete result', () => {
      return request(app.getHttpServer())
        .delete(`/users/delete/${uuidSample}`)
        .expect(200)
        .expect(usersService.delete());
    });

    it('should throw an error when deleting an user fails', () => {
      jest.spyOn(usersService, 'delete').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .delete(`/users/delete/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('update', () => {
    it('should return an update result', () => {
      return request(app.getHttpServer())
        .put(`/users/update/${uuidSample}`)
        .send(userSample)
        .expect(200)
        .expect(usersService.updateUser());
    });

    it('should throw an error when updating a team fails', () => {
      jest.spyOn(usersService, 'updateUser').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .put(`/users/update/${uuidSample}`)
        .send(userSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
