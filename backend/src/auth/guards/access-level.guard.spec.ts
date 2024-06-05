import { UsersService } from 'src/users/services/users.service';
import { AccessLevelGuard } from './access-level.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userSample } from 'src/utils/test.utils';
import { ROLES } from 'src/constants/roles';
import { ACCESS_LEVEL_KEY, ADMIN_KEY } from 'src/constants/keys.decorators';
import { ACCESS_LEVEL } from 'src/constants/access-levels';

describe('AccessLevelGuard', () => {
  let accessLevelGuard: AccessLevelGuard;
  let usersServiceMock: jest.Mocked<UsersService>;
  let contextMock: jest.Mocked<ExecutionContext>;
  let reflectorMock: jest.Mocked<Reflector>;
  let userRole: any;
  let projectsIncluded: any;

  beforeEach(() => {
    reflectorMock = {
      get: jest.fn(),
    } as any;

    usersServiceMock = {
      findById: jest.fn(() => {
        return {
          ...userSample,
          projectsIncluded,
        };
      }),
    } as any;

    contextMock = {
      getHandler: jest.fn(),
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              userRole,
              userId: '1',
              params: {
                projectId: '1',
              },
            };
          },
        };
      },
    } as any;

    accessLevelGuard = new AccessLevelGuard(reflectorMock, usersServiceMock);
  });

  it('should access if the handler is public', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementationOnce(() => true);

    expect(await accessLevelGuard.canActivate(contextMock)).toBe(true);
  });

  it('should return true if the user has admin role', async () => {
    userRole = ROLES.ADMIN;

    expect(await accessLevelGuard.canActivate(contextMock)).toBe(true);

    userRole = undefined;
  });

  it('should return true if there are no either access level required and admin access', async () => {
    expect(await accessLevelGuard.canActivate(contextMock)).toBe(true);
  });

  it('should throw an error if the user doenst have required admin role', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ADMIN_KEY) return true;
    });

    await expect(accessLevelGuard.canActivate(contextMock)).rejects.toThrow(
      'You need ADMIN role to execute this operation',
    );
  });

  it('should throw an error if the user doesnt belong to the project', async () => {
    projectsIncluded = [];

    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ACCESS_LEVEL_KEY) return [ACCESS_LEVEL.BASIC];
    });

    await expect(accessLevelGuard.canActivate(contextMock)).rejects.toThrow(
      'You dont belong to this project',
    );
  });

  it('should throw an error if the user doenst have enough access level', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ACCESS_LEVEL_KEY) return 'MAINTAINER';
    });

    projectsIncluded = [
      {
        project: {
          id: '1',
        },
        accessLevel: ACCESS_LEVEL.BASIC,
      },
    ];

    await expect(accessLevelGuard.canActivate(contextMock)).rejects.toThrow(
      'You dont have the required access level to execute this operation',
    );
  });

  it('should return true if the user has enough access level', async () => {
    jest.spyOn(reflectorMock, 'get').mockImplementation((metaData) => {
      if (metaData === ACCESS_LEVEL_KEY) return 'MAINTAINER';
    });

    projectsIncluded = [
      {
        project: {
          id: '1',
        },
        accessLevel: ACCESS_LEVEL.MAINTAINER,
      },
    ];

    expect(await accessLevelGuard.canActivate(contextMock)).toBe(true);
  });
});
