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
import { UsersService } from '../services/users.service';
import { CreateUserDTO, UpdateUserDTO } from '../dto/users.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  public async create(@Body() body: CreateUserDTO) {
    try {
      return await this.usersService.create(body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find/:userId')
  public async findById(@Param('userId', ParseUUIDPipe) userId: string) {
    try {
      return await this.usersService.findById(userId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Get('find-all')
  public async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Put('update/:userId')
  public async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ) {
    try {
      return await this.usersService.updateUser(userId, body);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }

  @Delete('delete/:userId')
  public async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    try {
      return await this.usersService.delete(userId);
    } catch (error) {
      throw ErrorManager.createSignaturError((error as ErrorManager).message);
    }
  }
}
