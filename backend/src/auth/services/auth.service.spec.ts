import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from './auth.service';
import { userSample } from 'src/utils/test.utils';
import * as bcrypt from 'bcrypt';

const hashedPassword = bcrypt.hashSync('password', 10);

describe('AuthService', () => {
  const usersService = {
    findBy: jest.fn(),
  };

  const jwtServiceMock = {
    signAsync: () => 'access token',
  };

  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should return an user with an access token while loging with the right email', async () => {
      jest.spyOn(usersService, 'findBy').mockImplementation((identifier) => {
        if (identifier === 'email') {
          return {
            ...userSample,
            password: hashedPassword,
          };
        } else {
          return null;
        }
      });

      expect(
        await authService.signIn(userSample.email, userSample.password),
      ).toEqual({
        user: {
          ...userSample,
          password: hashedPassword,
        },
        access_token: jwtServiceMock.signAsync(),
      });
    });

    it('should return an user with an access token while loging with the right username', async () => {
      jest.spyOn(usersService, 'findBy').mockImplementation((identifier) => {
        if (identifier === 'username') {
          return {
            ...userSample,
            password: hashedPassword,
          };
        } else {
          return null;
        }
      });

      expect(
        await authService.signIn(userSample.username, userSample.password),
      ).toEqual({
        user: {
          ...userSample,
          password: hashedPassword,
        },
        access_token: jwtServiceMock.signAsync(),
      });
    });

    it('should throw an error when finding the user fails', async () => {
      jest.spyOn(usersService, 'findBy').mockImplementationOnce(() => null);

      await expect(
        authService.signIn(userSample.username, userSample.password),
      ).rejects.toThrow(
        'UNAUTHORIZED :: Couldnt find any user with the received username/email',
      );
    });

    it('should throw an error when the userByUsername password is wrong', async () => {
      jest.spyOn(usersService, 'findBy').mockImplementation((identifier) => {
        if (identifier === 'username') {
          return {
            ...userSample,
            password: '',
          };
        } else {
          return null;
        }
      });

      await expect(
        authService.signIn(userSample.username, userSample.password),
      ).rejects.toThrow('UNAUTHORIZED :: Password is incorrect');
    });

    it('should throw an error when the userByEmail password is wrong', async () => {
      jest.spyOn(usersService, 'findBy').mockImplementation((identifier) => {
        if (identifier === 'email') {
          return {
            ...userSample,
            password: '',
          };
        } else {
          return null;
        }
      });

      await expect(
        authService.signIn(userSample.username, userSample.password),
      ).rejects.toThrow('UNAUTHORIZED :: Password is incorrect');
    });
  });
});
