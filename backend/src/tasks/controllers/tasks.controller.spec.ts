import * as request from 'supertest';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  errorSample,
  guardMock,
  taskSample,
  userTaskSample,
  uuidSample,
} from 'src/utils/test.utils';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let app: INestApplication;
  const tasksService = {
    create: () => taskSample,
    findById: () => 'task',
    findAll: () => ['task'],
    delete: () => 'task deleted',
    update: () => 'task updated',
    addUserToTask: () => 'user added to task',
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RolesGuard)
      .useValue(guardMock)
      .overrideGuard(AccessLevelGuard)
      .useValue(guardMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('findAll', () => {
    it('should get an array of tasks', () => {
      return request(app.getHttpServer())
        .get(`/tasks/find-all/${uuidSample}`)
        .expect(200)
        .expect(tasksService.findAll());
    });

    it('should throw an error when finding tasks fails', () => {
      jest.spyOn(tasksService, 'findAll').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });
      return request(app.getHttpServer())
        .get(`/tasks/find-all/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('findById', () => {
    it('should obtain a task', () => {
      return request(app.getHttpServer())
        .get(`/tasks/find/${uuidSample}`)
        .expect(200)
        .expect(tasksService.findById());
    });

    it('should throw an error when finding a task fails', () => {
      jest.spyOn(tasksService, 'findById').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .get(`/tasks/find/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('create', () => {
    it('should obtain a created task', () => {
      return request(app.getHttpServer())
        .post(`/tasks/create/${uuidSample}`)
        .send(taskSample)
        .expect(201)
        .expect(taskSample);
    });

    it('should throw an error when creating a task fails', () => {
      jest.spyOn(tasksService, 'create').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .post(`/tasks/create/${uuidSample}`)
        .send(taskSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('delete', () => {
    it('should obtain a delete result', () => {
      return request(app.getHttpServer())
        .delete(`/tasks/delete/${uuidSample}`)
        .expect(200)
        .expect(tasksService.delete());
    });

    it('should throw an error when deleting a task fails', () => {
      jest.spyOn(tasksService, 'delete').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .delete(`/tasks/delete/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('update', () => {
    it('should obtain an update result', () => {
      return request(app.getHttpServer())
        .put(`/tasks/update/${uuidSample}`)
        .send(taskSample)
        .expect(200)
        .expect(tasksService.update());
    });

    it('should throw an error when updating a task fails', () => {
      jest.spyOn(tasksService, 'update').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .put(`/tasks/update/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('addUserToTask', () => {
    it('should obtain a result of the addition', () => {
      return request(app.getHttpServer())
        .post('/tasks/add/user-to-task')
        .send(userTaskSample)
        .expect(201)
        .expect(tasksService.addUserToTask());
    });

    it('should throw an error when adding an user to a task fails', () => {
      jest.spyOn(tasksService, 'addUserToTask').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .post('/tasks/add/user-to-task')
        .send(userTaskSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
