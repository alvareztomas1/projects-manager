import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  errorSample,
  guardMock,
  projectSample,
  userProjectSample,
  uuidSample,
} from 'src/utils/test.utils';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';

describe('ProjectsController', () => {
  let app: INestApplication;
  const projectsService = {
    findAll: () => ['project'],
    findById: () => 'project',
    create: () => projectSample,
    update: () => 'project updated',
    delete: () => 'delete updated',
    addUserToProject: () => 'user added',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    })
      .overrideProvider(ProjectsService)
      .useValue(projectsService)
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
    it('should return an array of projects', () => {
      return request(app.getHttpServer())
        .get('/projects/find-all')
        .expect(200)
        .expect(projectsService.findAll());
    });

    it('should throw an error when finding users fails', () => {
      jest.spyOn(projectsService, 'findAll').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .get('/projects/find-all')
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('findById', () => {
    it('should return a project', () => {
      return request(app.getHttpServer())
        .get(`/projects/find/${uuidSample}`)
        .expect(200)
        .expect(projectsService.findById());
    });

    it('should throw an error when finding an user fails', () => {
      jest.spyOn(projectsService, 'findById').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .get(`/projects/find/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('create', () => {
    it('should return a created project', () => {
      return request(app.getHttpServer())
        .post(`/projects/create/${uuidSample}`)
        .send(projectSample)
        .expect(201)
        .expect(projectsService.create());
    });

    it('should throw an error when creating a project fails', () => {
      jest.spyOn(projectsService, 'create').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .post(`/projects/create/${uuidSample}`)
        .send(projectSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('update', () => {
    it('should return an update result', () => {
      return request(app.getHttpServer())
        .put(`/projects/update/${uuidSample}`)
        .send(projectSample)
        .expect(200)
        .expect(projectsService.update());
    });

    it('should throw an error when updating a project fails', () => {
      jest.spyOn(projectsService, 'update').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .put(`/projects/update/${uuidSample}`)
        .send(projectSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('delete', () => {
    it('should return an delete result', () => {
      return request(app.getHttpServer())
        .delete(`/projects/delete/${uuidSample}`)
        .expect(200)
        .expect(projectsService.delete());
    });

    it('should throw an error when updating a project fails', () => {
      jest.spyOn(projectsService, 'delete').mockImplementationOnce(() => {
        throw new BadRequestException(errorSample.message);
      });

      return request(app.getHttpServer())
        .delete(`/projects/delete/${uuidSample}`)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  describe('addUserToProject', () => {
    it('should return a result after adding an user to a project', () => {
      return request(app.getHttpServer())
        .post('/projects/add/user-to-project')
        .send(userProjectSample)
        .expect(201)
        .expect(projectsService.addUserToProject());
    });

    it('should throw an error when adding a user to a project fails', () => {
      jest
        .spyOn(projectsService, 'addUserToProject')
        .mockImplementationOnce(() => {
          throw new BadRequestException(errorSample.message);
        });

      return request(app.getHttpServer())
        .post('/projects/add/user-to-project')
        .send(userProjectSample)
        .expect(errorSample.statusCode)
        .expect(errorSample);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
