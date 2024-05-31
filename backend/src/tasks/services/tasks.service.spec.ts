import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksController } from '../controllers/tasks.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSourceConfigTesting } from 'src/config/data.source';
import { TaskEntity } from '../entities/task.entity';
import { UserTaskEntity } from 'src/users/entities/userTask.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  guardMock,
  projectSample,
  taskSample,
  userSample,
  uuidSample,
} from 'src/utils/test.utils';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<TaskEntity>;
  let userTaskRepository: Repository<UserTaskEntity>;
  let usersRepository: Repository<UserEntity>;
  let projectsRepository: Repository<ProjectEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        ProjectsModule,
        TypeOrmModule.forRoot(DataSourceConfigTesting),
        TypeOrmModule.forFeature([TaskEntity, UserTaskEntity, UserEntity]),
      ],
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    tasksService = moduleRef.get<TasksService>(TasksService);

    tasksRepository = moduleRef.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
    userTaskRepository = moduleRef.get<Repository<UserTaskEntity>>(
      getRepositoryToken(UserTaskEntity),
    );
    usersRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    projectsRepository = moduleRef.get<Repository<ProjectEntity>>(
      getRepositoryToken(ProjectEntity),
    );
  });

  it('should be defined', async () => {
    expect(tasksService).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      await tasksService.create(createdProject.id, taskSample);

      expect(await tasksRepository.find()).toHaveLength(1);
    });

    it('should throw an error when creating a task fails', async () => {
      jest.spyOn(tasksRepository, 'save').mockImplementationOnce(jest.fn());
      const createdProject = await projectsRepository.save(projectSample);

      await expect(
        tasksService.create(createdProject.id, taskSample),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt save the task');
    });
  });

  describe('findById', () => {
    it('should find a task by an id', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );

      expect(await tasksService.findById(createdTask.id)).toEqual({
        ...createdTask,
        usersIncluded: [],
        project: createdProject,
      });
    });

    it('should throw an error when finding a task fails', async () => {
      await expect(tasksService.findById(uuidSample)).rejects.toThrow(
        'NOT_FOUND :: Couldnt find any task with the received id',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );

      const result = {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.description,
        status: createdTask.status,
        usersIncluded: [],
        updatedAt: createdTask.updatedAt,
        createdAt: createdTask.createdAt,
      };

      expect(await tasksService.findAll(createdProject.id)).toEqual([result]);
    });

    it('should throw an error if finding tasks fails', async () => {
      await expect(tasksService.findAll(uuidSample)).rejects.toThrow(
        'NOT_FOUND :: Couldnt find any task',
      );
    });
  });

  describe('update', () => {
    it('should update a task register information', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );
      await tasksService.update(createdTask.id, {
        title: 'edited',
      });

      const editedTask = await tasksService.findById(createdTask.id);

      expect(editedTask.title).toEqual('edited');
    });

    it('should throw an error when updating a task fails', async () => {
      await expect(
        tasksService.update(uuidSample, {
          title: 'edited',
        }),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt update the task information');
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );
      await tasksService.delete(createdTask.id);

      expect(await tasksRepository.find()).toEqual([]);
    });

    it('should throw an error when deleting a task fails', async () => {
      await expect(tasksService.delete(uuidSample)).rejects.toThrow(
        'BAD_REQUEST :: Couldnt delete any task',
      );
    });
  });

  describe('addUserToTask', () => {
    it('should add an user to a task', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );
      const createdUser = await usersRepository.save(userSample);

      await tasksService.addUserToTask({
        user: createdUser.id,
        task: createdTask.id,
      });

      expect((await userTaskRepository.find()).length).toEqual(1);
    });

    it('should throw an error when adding a user to a task fails', async () => {
      jest.spyOn(userTaskRepository, 'save').mockImplementationOnce(jest.fn());

      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );
      const createdUser = await usersRepository.save(userSample);

      await expect(
        tasksService.addUserToTask({
          task: createdTask.id,
          user: createdUser.id,
        }),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt add user to task');
    });

    it('should throw an error if the user already exists in the task', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdTask = await tasksService.create(
        createdProject.id,
        taskSample,
      );
      const createdUser = await usersRepository.save(userSample);

      await tasksService.addUserToTask({
        user: createdUser.id,
        task: createdTask.id,
      });

      await expect(
        tasksService.addUserToTask({
          user: createdUser.id,
          task: createdTask.id,
        }),
      ).rejects.toThrow('BAD_REQUEST :: User is already part of the task');
    });
  });
});
