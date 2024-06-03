import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DataSourceConfigTesting } from 'src/config/data.source';
import { ProjectEntity } from '../entities/project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserProjectEntity } from 'src/users/entities/userProject.entity';
import { ProjectsController } from '../controllers/projects.controller';
import { Repository } from 'typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  guardMock,
  projectSample,
  userSample,
  uuidSample,
} from 'src/utils/test.utils';
import { ProjectsService } from './projects.service';
import { UsersService } from 'src/users/services/users.service';
import { ACCESS_LEVEL } from 'src/constants/access-levels';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let projectsRepository: Repository<ProjectEntity>;
  let usersProjectsRepository: Repository<UserProjectEntity>;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot(DataSourceConfigTesting),
        TypeOrmModule.forFeature([
          ProjectEntity,
          UserEntity,
          UserProjectEntity,
        ]),
      ],
      controllers: [ProjectsController],
      providers: [ProjectsService, UsersService],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    projectsService = moduleRef.get<ProjectsService>(ProjectsService);
    projectsRepository = moduleRef.get<Repository<ProjectEntity>>(
      getRepositoryToken(ProjectEntity),
    );
    usersProjectsRepository = moduleRef.get<Repository<UserProjectEntity>>(
      getRepositoryToken(UserProjectEntity),
    );

    usersRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(projectsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const createdUser = await usersRepository.save(userSample);
      const createdProject = await projectsService.create(
        createdUser.id,
        projectSample,
      );

      expect(await projectsRepository.find()).toEqual([createdProject]);
    });

    it('should throw an error if saving the project fails', async () => {
      jest.spyOn(projectsRepository, 'save').mockImplementationOnce(jest.fn());
      const createdUser = await usersRepository.save(userSample);

      await expect(
        projectsService.create(createdUser.id, projectSample),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt save the project');
    });
  });

  describe('update', () => {
    it('should update the project information', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      await projectsService.update(createdProject.id, {
        title: 'edited',
      });

      const editedProject = await projectsRepository.findOneBy({
        id: createdProject.id,
      });

      expect(editedProject?.title).toEqual('edited');
    });

    it('should throw an error when updating a project fails', async () => {
      await expect(
        projectsService.update(uuidSample, {
          title: 'edited',
        }),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt update the project');
    });
  });

  describe('findAll', () => {
    it('should find an array of projects', async () => {
      const createdProject = await projectsRepository.save(projectSample);

      expect(await projectsService.findAll()).toEqual([createdProject]);
    });

    it('should throw an error if finding users fails', async () => {
      await expect(projectsService.findAll()).rejects.toThrow(
        'NOT_FOUND :: Couldnt find any project',
      );
    });
  });

  describe('findById', () => {
    it('should find a project with the received id', async () => {
      const createdProject = await projectsRepository.save(projectSample);

      expect(await projectsService.findById(createdProject.id)).toEqual({
        ...createdProject,
        tasks: [],
        usersIncluded: [],
      });
    });

    it('should throw an error if finding a project fails', async () => {
      await expect(projectsService.findById(uuidSample)).rejects.toThrow(
        'NOT_FOUND :: Couldnt find a project with the received id',
      );
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      expect(await projectsRepository.find()).toEqual([createdProject]);

      await projectsService.delete(createdProject.id);

      expect(await projectsRepository.find()).toEqual([]);
    });

    it('should throw an error when deleting a project fails', async () => {
      await expect(projectsService.delete(uuidSample)).rejects.toThrow(
        'BAD_REQUEST :: Couldnt delete any project',
      );
    });
  });

  describe('addUserToProject', () => {
    it('should add an user to a project', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdUser = await usersRepository.save(userSample);

      await projectsService.addUserToProject({
        user: createdUser.id,
        project: createdProject.id,
        accessLevel: ACCESS_LEVEL.BASIC,
      });

      expect(await usersProjectsRepository.find()).toHaveLength(1);
    });

    it('should throw an error if user is already in the project', async () => {
      const createdProject = await projectsRepository.save(projectSample);
      const createdUser = await usersRepository.save(userSample);

      await projectsService.addUserToProject({
        user: createdUser.id,
        project: createdProject.id,
        accessLevel: ACCESS_LEVEL.BASIC,
      });

      await expect(
        projectsService.addUserToProject({
          user: createdUser.id,
          project: createdProject.id,
          accessLevel: ACCESS_LEVEL.BASIC,
        }),
      ).rejects.toThrow('BAD_REQUEST :: User already exists in project');
    });

    it('should throw an error if saving the user to the project fails', async () => {
      jest
        .spyOn(usersProjectsRepository, 'save')
        .mockImplementationOnce(jest.fn());

      const createdProject = await projectsRepository.save(projectSample);
      const createdUser = await usersRepository.save(userSample);

      await expect(
        projectsService.addUserToProject({
          user: createdUser.id,
          project: createdProject.id,
          accessLevel: ACCESS_LEVEL.BASIC,
        }),
      ).rejects.toThrow(
        'BAD_REQUEST :: Couldnt save the user project relation',
      );
    });
  });
});
