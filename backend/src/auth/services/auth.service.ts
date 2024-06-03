import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userIdentifier: string, password: string) {
    const userByUsername = await this.usersService.findBy(
      'username',
      userIdentifier,
    );
    const userByEmail = await this.usersService.findBy('email', userIdentifier);

    if (userByEmail === null && userByUsername === null) {
      throw new ErrorManager(
        'UNAUTHORIZED',
        'Couldnt find any user with the received username/email',
      );
    }

    if (userByUsername) {
      const passwordIsValid = await bcrypt.compare(
        password,
        userByUsername.password,
      );

      if (!passwordIsValid) {
        throw new ErrorManager('UNAUTHORIZED', 'Password is incorrect');
      }
    }

    if (userByEmail) {
      const passwordIsValid = await bcrypt.compare(
        password,
        userByEmail.password,
      );
      if (!passwordIsValid) {
        throw new ErrorManager('UNAUTHORIZED', 'Password is incorrect');
      }
    }

    const payload = {
      sub: userByUsername?.id || userByEmail?.id,
      username: userByUsername?.username || userByEmail?.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userByUsername || userByEmail,
    };
  }
}
