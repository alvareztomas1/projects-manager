import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { userSample } from 'src/utils/test.utils';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflectorMock: jest.Mocked<Reflector>;
  let usersServiceMock: jest.Mocked<UsersService>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let contextMock: jest.Mocked<ExecutionContext>;
  let accessTokenValue: string | boolean = false;

  beforeEach(() => {
    jwtServiceMock = {
      verifyAsync: () => {
        return {
          sub: '',
        };
      },
    } as any;

    usersServiceMock = {
      findById: () => userSample,
    } as any;

    reflectorMock = {
      get: jest.fn(),
    } as any;

    contextMock = {
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => {
        return {
          getRequest: () => {
            return {
              headers: {
                access_token: accessTokenValue,
              },
            };
          },
        };
      }),
    } as any;

    authGuard = new AuthGuard(reflectorMock, jwtServiceMock, usersServiceMock);
  });

  it('should access if the handler is public', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementationOnce(() => true);

    expect(await authGuard.canActivate(contextMock)).toBe(true);
  });

  it('should throw an error when access token is missing or if it hasnt has string type', async () => {
    await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true if the user exists and the token is valid', async () => {
    accessTokenValue = 'token';

    expect(await authGuard.canActivate(contextMock)).toBe(true);
  });

  it('should throw an error if user isnt valid', async () => {
    jest.spyOn(usersServiceMock, 'findById').mockImplementationOnce(() => {
      throw Error('user error');
    });

    await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
      'user error',
    );
  });

  it('should throw an error if token isnt valid', async () => {
    jest.spyOn(jwtServiceMock, 'verifyAsync').mockImplementationOnce(() => {
      throw Error('token error');
    });

    await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
      'token error',
    );
  });
});
