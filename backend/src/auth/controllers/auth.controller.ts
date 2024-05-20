import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthDTO) {
    try {
      return await this.authService.signIn(body.userIdentifier, body.password);
    } catch (error) {
      throw error;
    }
  }
}
