import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from '../dto/users.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async create(body: CreateUserDTO): Promise<UserEntity> {
    body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
    const user = await this.usersRepository.save(body);

    if (user === undefined) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt save the user');
    }

    return user;
  }

  public async findById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .leftJoinAndSelect('user.projectsIncluded', 'projectsIncluded')
      .leftJoinAndSelect('projectsIncluded.project', 'project')
      .leftJoinAndSelect('user.tasksIncluded', 'tasksIncluded')
      .leftJoinAndSelect('tasksIncluded.task', 'task')
      .getOne();

    if (user === null) {
      throw new ErrorManager(
        'NOT_FOUND',
        'Couldnt find an user with the received id',
      );
    }

    return user;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0) {
      throw new ErrorManager('NOT_FOUND', 'Couldnt find any user');
    }

    return users;
  }

  public async updateUser(
    userId: string,
    body: UpdateUserDTO,
  ): Promise<UpdateResult> {
    const updateResult = await this.usersRepository.update(userId, body);

    if (updateResult.affected === 0) {
      throw new ErrorManager('BAD_REQUEST', 'Couldnt update the user');
    }

    return updateResult;
  }

  public async delete(userId: string): Promise<DeleteResult> {
    const deleteResult = await this.usersRepository.delete(userId);

    if (deleteResult.affected === 0) {
      throw new ErrorManager(
        'BAD_REQUEST',
        'Couldnt delete the user with the received id',
      );
    }

    return deleteResult;
  }

  public async findBy(
    key: keyof UserEntity,
    value: any,
  ): Promise<UserEntity | null> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ [key]: value })
      .getOne();

    return user;
  }

  public async findPatialBy(
    key: keyof UserEntity,
    value: any,
  ): Promise<UserEntity[]> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where({ [key]: Like(`%${value}%`) })
      .getMany();

    return users;
  }
}
