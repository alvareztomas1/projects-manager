import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { ROLES } from 'src/constants/roles';
import { ADMIN_KEY, ROLES_KEY } from 'src/constants/keys.decorators';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflectorMock: jest.Mocked<Reflector>;
  let contextMock: jest.Mocked<ExecutionContext>;
  let userRole: any;

  beforeEach(() => {
    reflectorMock = {
      get: jest.fn(),
    } as any;

    contextMock = {
      getHandler: jest.fn(),
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              userRole,
            };
          },
        };
      },
    } as any;

    rolesGuard = new RolesGuard(reflectorMock);
  });

  it('should access if the handler is public', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementationOnce(() => true);

    expect(await rolesGuard.canActivate(contextMock)).toBe(true);
  });

  it('should return true if the user has admin role', async () => {
    userRole = ROLES.ADMIN;

    expect(await rolesGuard.canActivate(contextMock)).toBe(true);

    userRole = undefined;
  });

  it('should return true if no admin access or required roles where defined', async () => {
    expect(await rolesGuard.canActivate(contextMock)).toBe(true);
  });

  it('should throw an error if the user doenst have the needed admin role', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ADMIN_KEY) return true;
    });

    await expect(rolesGuard.canActivate(contextMock)).rejects.toThrow(
      'You need ADMIN role to execute this operation',
    );
  });

  it('should throw an error if the user doesnt have enough permissions', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ROLES_KEY) return [ROLES.CREATOR];
    });

    userRole = ROLES.BASIC;

    await expect(rolesGuard.canActivate(contextMock)).rejects.toThrow(
      'You dont have permissions to execute this operation',
    );
  });

  it('should return true if the user has enough permissions', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ROLES_KEY) {
        return [ROLES.CREATOR];
      } else {
        return undefined;
      }
    });

    userRole = ROLES.CREATOR;

    expect(await rolesGuard.canActivate(contextMock)).toBe(true);
  });
});
