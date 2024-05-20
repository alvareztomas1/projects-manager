import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/keys.decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const userRole = req.userRole;

    if (userRole === ROLES.ADMIN) return true;

    const requiredRoles = this.reflector.get(ROLES_KEY, context.getHandler());
    const adminAccess = this.reflector.get(ADMIN_KEY, context.getHandler());

    if (requiredRoles === undefined) {
      if (adminAccess === undefined) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You need ADMIN role to execute this operation',
        );
      }
    }

    const userHasRequiredRole = requiredRoles.some(
      (role: keyof typeof ROLES) => role === userRole,
    );

    if (!userHasRequiredRole) {
      throw new UnauthorizedException(
        'You dont have permissions to execute this operation',
      );
    }

    return true;
  }
}
