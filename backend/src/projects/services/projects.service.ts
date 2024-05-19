import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto/projects.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  public async create(body: CreateProjectDTO): Promise<ProjectEntity> {
    const project = await this.projectsRepository.save(body);

    if (project === undefined) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt save the project');
    }

    return project;
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
      .createQueryBuilder('projects')
      .where({ id: projectId })
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
}
