import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from '../user/entity/user.entity';
import { CurrentUser } from '../utils/decorator/user.decorator';
import { JwtPayload, JwtRefreshPayload } from '../utils/interface';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authUserSingUp: AuthUserDto,
  ) {
    const user = await this.authService.signup(authUserSingUp);
    return plainToClass(User, user);
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authUserLogin: AuthUserDto,
  ) {
    const user = await this.authService.login(authUserLogin);

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return await this.authService.getTokens(user);
  }

  @Post('refresh')
  async refresh(@CurrentUser() { userId, refreshToken }: JwtRefreshPayload) {
    const user = await this.authService.refresh(userId, refreshToken);

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return await this.authService.getTokens(user);
  }

  async logout(@CurrentUser() { userId }: JwtPayload) {
    return await this.authService.logout(userId);
  }
}
