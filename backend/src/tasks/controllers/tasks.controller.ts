import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';
import { CreateUserTaskDTO } from 'src/users/dto/users.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @AccessLevel('MAINTAINER')
  @Post('create/:projectId')
  public async create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() body: CreateTaskDTO,
  ) {
    try {
      return await this.tasksService.create(projectId, body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find/:taskId')
  public async findById(@Param('taskId', ParseUUIDPipe) taskId: string) {
    try {
      return await this.tasksService.findById(taskId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find-all/:projectId')
  public async findAll(@Param('projectId', ParseUUIDPipe) projectId: string) {
    try {
      return await this.tasksService.findAll(projectId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('MAINTAINER')
  @Delete('delete/:taskId')
  public async delete(@Param('taskId', ParseUUIDPipe) taskId: string) {
    try {
      return await this.tasksService.delete(taskId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('MAINTAINER')
  @Put('update/:taskId')
  public async update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() body: UpdateTaskDTO,
  ) {
    try {
      return await this.tasksService.update(taskId, body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('OWNER')
  @Post('add/user-to-task')
  public async addUserToTask(@Body() body: CreateUserTaskDTO) {
    try {
      return await this.tasksService.addUserToTask(body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }
}
