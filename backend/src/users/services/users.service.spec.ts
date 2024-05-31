import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { DataSourceConfigTesting } from 'src/config/data.source';
import { userSample, uuidSample } from 'src/utils/test.utils';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(DataSourceConfigTesting),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', async () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should creates an user', async () => {
      await usersService.create(userSample);
      expect(await usersRepository.find()).toEqual([userSample]);
    });
    it('should throw an error when saving an user fails', async () => {
      jest.spyOn(usersRepository, 'save').mockImplementation(jest.fn());

      await expect(usersService.create(userSample)).rejects.toThrow(
        'BAD_REQUEST :: Couldnt save the user',
      );
    });
  });

  describe('findById', () => {
    it('should find a user with the received id', async () => {
      const createdUser = await usersService.create(userSample);
      expect(await usersService.findById(createdUser.id)).toEqual({
        ...createdUser,
        projectsIncluded: [],
        tasksIncluded: [],
      });
    });
    it('should throw an error when finding the user fails', async () => {
      await expect(usersService.findById('')).rejects.toThrow(
        'NOT_FOUND :: Couldnt find an user with the received id',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const createdUser = await usersService.create(userSample);
      expect(await usersService.findAll()).toEqual([createdUser]);
    });
    it('should throw an error when fingin all users fails', async () => {
      await expect(usersService.findAll()).rejects.toThrow(
        'NOT_FOUND :: Couldnt find any user',
      );
    });
  });

  describe('delete', () => {
    it('should delete an user', async () => {
      const createdUser = await usersService.create(userSample);
      expect(await usersService.findById(createdUser.id)).toEqual({
        ...createdUser,
        projectsIncluded: [],
        tasksIncluded: [],
      });

      await usersService.delete(createdUser.id);

      await expect(usersService.findById(createdUser.id)).rejects.toThrow(
        'NOT_FOUND :: Couldnt find an user with the received id',
      );
    });
    it('should throw an error when deleting an user fails', async () => {
      await expect(usersService.delete('1')).rejects.toThrow(
        'BAD_REQUEST :: Couldnt delete the user with the received id',
      );
    });
  });

  describe('update', () => {
    it('should update the user information', async () => {
      const createdUser = await usersService.create(userSample);
      const editedName = {
        username: 'edited username',
      };
      await usersService.updateUser(createdUser.id, editedName);

      const editedUser = await usersService.findById(createdUser.id);

      expect(editedUser.username).toEqual(editedName.username);
    });
    it('should throw an error when editing an user fails', async () => {
      await expect(
        usersService.updateUser(uuidSample, {
          username: 'edited username',
        }),
      ).rejects.toThrow('BAD_REQUEST :: Couldnt update the user');
    });
  });

  describe('findBy', () => {
    it('should find an user with the received criteria', async () => {
      const createdUser = await usersService.create(userSample);

      expect(
        await usersService.findBy('username', createdUser.username),
      ).toEqual(createdUser);
    });
  });
});
