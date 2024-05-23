import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';
import { CreateUserTaskDTO } from 'src/users/dto/users.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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

  @Delete('delete/:taskId')
  public async delete(@Param('taskId', ParseUUIDPipe) taskId: string) {
    try {
      return await this.tasksService.delete(taskId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

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

  @Post('add/user-to-task')
  public async addUserToTask(@Body() body: CreateUserTaskDTO) {
    try {
      return await this.tasksService.addUserToTask(body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }
}
