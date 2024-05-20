import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PUBLIC_KEY } from 'src/constants/keys.decorators';
import { UsersService } from 'src/users/services/users.service';
import { IPayload } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['access_token'];

    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException();
    }

    try {
      const payload: IPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersService.findById(payload.sub);

      req.userId = user.id;
      req.userRole = user.role;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
