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
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto/projects.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateUserToProjectDTO } from 'src/users/dto/users.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles('CREATOR')
  @Post('create/:userOwner')
  public async create(
    @Param('userOwner', ParseUUIDPipe) userId: string,
    @Body() body: CreateProjectDTO,
  ) {
    try {
      return await this.projectsService.create(userId, body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('MAINTAINER')
  @Put('update/:projectId')
  public async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() body: UpdateProjectDTO,
  ) {
    try {
      return await this.projectsService.update(projectId, body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find/:projectId')
  public async findById(@Param('projectId', ParseUUIDPipe) projectId: string) {
    try {
      return await this.projectsService.findById(projectId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find-all')
  public async findAll() {
    try {
      return await this.projectsService.findAll();
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('OWNER')
  @Delete('delete/:projectId')
  public async delete(@Param('projectId', ParseUUIDPipe) projectId: string) {
    try {
      return await this.projectsService.delete(projectId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @AccessLevel('OWNER')
  @Post('add/user-to-project')
  public async addUserToProject(@Body() body: CreateUserToProjectDTO) {
    try {
      return await this.projectsService.addUserToProject(body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }
}
