import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { User } from '../user/entity/user.entity';
import { CurrentUser } from '../utils/decorator/user.decorator';
import { ResponseMessages } from '../utils/enum/responseMessage';
import { JwtPayload, JwtRefreshPayload } from '../utils/interface';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';
import { RefreshTokenGuard } from '../utils/guard/refreshToken.guard';
import { Auth } from '../utils/decorator/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiCreatedResponse({ description: 'Successful signup' })
  @ApiConflictResponse({ description: `Login ${ResponseMessages.CONFLICT}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('signup')
  async signup(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    authUserSingUp: AuthUserDto,
  ) {
    const user = await this.authService.signup(authUserSingUp);
    return plainToClass(User, user);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ description: 'Successful login' })
  @ApiForbiddenResponse({ description: ResponseMessages.INCORRECT_AUTH_DATA })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
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

  @ApiOperation({ summary: 'Update Tokens' })
  @ApiOkResponse({ description: 'Updated Tokens' })
  @ApiForbiddenResponse({ description: ResponseMessages.FORBIDDEN })
  @ApiBearerAuth('Bearer')
  @UseGuards(RefreshTokenGuard)
  @ApiUnauthorizedResponse({ description: ResponseMessages.UNAUTHORIZED })
  @Post('refresh')
  async refresh(@CurrentUser() { userId, refreshToken }: JwtRefreshPayload) {
    const user = await this.authService.refresh(userId, refreshToken);

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return await this.authService.getTokens(user);
  }

  @ApiOperation({ summary: 'Destroy Token' })
  @ApiOkResponse({ description: 'Refresh Token is Null' })
  @Auth()
  async logout(@CurrentUser() { userId }: JwtPayload) {
    return await this.authService.logout(userId);
  }
}
