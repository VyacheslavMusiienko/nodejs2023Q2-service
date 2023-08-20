import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authUserSingUp: AuthUserDto) {
    return await this.authService.signup(authUserSingUp);
  }

  @Post('login')
  async login(@Body() authUserLogin: AuthUserDto) {
    return await this.authService.login(authUserLogin);
  }

  @Post('refresh')
  async refresh(@Body() authUserRefresh: AuthUserDto) {
    return await this.authService.refresh(authUserRefresh);
  }
}
