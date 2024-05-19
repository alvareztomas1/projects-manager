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
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto/projects.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  public async create(@Body() body: CreateProjectDTO) {
    try {
      // TODO: GIVE OWNER ACCESS LEVEL TO THE USER
      return await this.projectsService.create(body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

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

  @Delete('delete/:projectId')
  public async delete(@Param('projectId', ParseUUIDPipe) projectId: string) {
    try {
      return await this.projectsService.delete(projectId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }
}
