import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ErrorManager } from 'src/utils/error.manager';
import { UserTaskEntity } from 'src/users/entities/userTask.entity';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserTaskDTO } from 'src/users/dto/users.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    private readonly projectsService: ProjectsService,
    @InjectRepository(UserTaskEntity)
    private readonly usersTasksRepository: Repository<UserTaskEntity>,
    private readonly usersService: UsersService,
  ) {}

  public async create(
    projectId: string,
    body: CreateTaskDTO,
  ): Promise<TaskEntity> {
    const project = await this.projectsService.findById(projectId);

    const task = await this.tasksRepository.save({
      ...body,
      project,
    });

    if (task === undefined) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt save the task');
    }

    return task;
  }

  public async findById(taskId: string): Promise<TaskEntity> {
    const task = await this.tasksRepository
      .createQueryBuilder('task')
      .where({ id: taskId })
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.usersIncluded', 'usersIncluded')
      .leftJoinAndSelect('usersIncluded.user', 'user')
      .getOne();

    if (task === null) {
      throw new ErrorManager(
        'NOT_FOUND',
        'Couldnt find any task with the received id',
      );
    }

    return task;
  }

  public async findAll(projectId: string): Promise<TaskEntity[]> {
    const tasks = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where({ project: projectId })
      .leftJoinAndSelect('tasks.usersIncluded', 'usersIncluded')
      .leftJoinAndSelect('usersIncluded.user', 'user')
      .getMany();

    if (tasks.length === 0) {
      throw new ErrorManager(
        'NOT_FOUND',
        'Couldnt find any task in the received project',
      );
    }

    return tasks;
  }

  public async delete(taskId: string): Promise<DeleteResult> {
    const deleteResult = await this.tasksRepository.delete(taskId);

    if (deleteResult.affected === 0) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt delete any task');
    }

    return deleteResult;
  }

  public async update(
    taskId: string,
    body: UpdateTaskDTO,
  ): Promise<UpdateResult> {
    const updateResult = await this.tasksRepository.update(taskId, body);

    if (updateResult.affected === 0) {
      throw new ErrorManager(
        'BAD_REQUEST',
        'Couldnt update the task information',
      );
    }

    return updateResult;
  }

  public async addUserToTask(body: CreateUserTaskDTO): Promise<UserTaskEntity> {
    const user = await this.usersService.findById(body.user);
    const task = await this.findById(body.task);
    const userExistsInTask = task.usersIncluded.find(
      (userTask) => userTask.user.id === user.id,
    );

    if (userExistsInTask) {
      throw new ErrorManager('BAD_REQUEST', 'User is already part of the task');
    }

    const bodyToSave = {
      user,
      task,
    };
    const userTask = await this.usersTasksRepository.save(bodyToSave);

    if (userTask === undefined) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt add user to task');
    }

    return userTask;
  }
}
