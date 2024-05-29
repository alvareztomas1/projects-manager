import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto/projects.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersService } from 'src/users/services/users.service';
import { ACCESS_LEVEL } from 'src/constants/access-levels';
import { UserProjectEntity } from 'src/users/entities/userProject.entity';
import { CreateUserToProjectDTO } from 'src/users/dto/users.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
    @InjectRepository(UserProjectEntity)
    private readonly usersProjectsRepository: Repository<UserProjectEntity>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  public async create(
    userId: string,
    body: CreateProjectDTO,
  ): Promise<ProjectEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const project = await this.projectsRepository.save(body);
      await this.addUserToProject({
        accessLevel: ACCESS_LEVEL.OWNER,
        user: userId,
        project: project.id,
      });

      if (project === undefined) {
        throw new ErrorManager('BAD_REQUEST', 'Couldnt save the project');
      }

      await queryRunner.commitTransaction();
      return project;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async update(
    projectId: string,
    body: UpdateProjectDTO,
  ): Promise<UpdateResult> {
    const updateResult = await this.projectsRepository.update(projectId, body);

    if (updateResult.affected === 0) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt update the project');
    }

    return updateResult;
  }

  public async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.projectsRepository.find();

    if (projects.length === 0) {
      throw new ErrorManager('NOT_FOUND', 'Couldnt find any project');
    }

    return projects;
  }

  public async findById(projectId: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository
      .createQueryBuilder('project')
      .where({ id: projectId })
      .leftJoinAndSelect('project.usersIncluded', 'usersIncluded')
      .leftJoinAndSelect('usersIncluded.user', 'user')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .getOne();

    if (project === null) {
      throw new ErrorManager(
        'NOT_FOUND',
        'Couldnt find a project with the received id',
      );
    }

    return project;
  }

  public async delete(projectId: string): Promise<DeleteResult> {
    const deleteResult = await this.projectsRepository.delete(projectId);

    if (deleteResult.affected === 0) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt delete any project');
    }

    return deleteResult;
  }

  public async addUserToProject(
    body: CreateUserToProjectDTO,
  ): Promise<UserProjectEntity> {
    const user = await this.usersService.findById(body.user);
    const project = await this.findById(body.project);
    const userExistsInProject = project.usersIncluded.find(
      (userProject) => userProject.user.id === user.id,
    );

    if (userExistsInProject) {
      throw new ErrorManager('BAD_REQUEST', 'User already exists in project');
    }

    const bodyToSave = {
      accessLevel: `${body.accessLevel}`,
      user,
      project,
    };
    const userProject = await this.usersProjectsRepository.save(bodyToSave);

    if (userProject === undefined) {
      throw new ErrorManager(
        'BAD_REQUEST',
        'Couldnt save the user project relation',
      );
    }

    return userProject;
  }
}
