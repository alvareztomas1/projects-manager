import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL } from 'src/constants/access-levels';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
} from 'src/constants/keys.decorators';
import { ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const userRole = req.userRole;

    if (userRole === ROLES.ADMIN) return true;

    const requriedAccessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );
    const adminAccess = this.reflector.get(ADMIN_KEY, context.getHandler());

    if (requriedAccessLevel === undefined) {
      if (adminAccess === undefined) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You need ADMIN role to execute this operation',
        );
      }
    }

    const userId = req.userId;
    const projectId = req.params.projectId;
    const user = await this.usersService.findById(userId);
    const userExistsInProject = user.projectsIncluded.find(
      (userProject) => userProject.project.id === projectId,
    );

    if (!userExistsInProject) {
      throw new UnauthorizedException('You dont belong to this project');
    }

    if (+ACCESS_LEVEL[requriedAccessLevel] > +userExistsInProject.accessLevel) {
      throw new UnauthorizedException(
        'You dont have the required access level to execute this operation',
      );
    }

    return true;
  }
}
