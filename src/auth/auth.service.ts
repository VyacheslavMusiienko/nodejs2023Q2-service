import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma/prisma.service';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { compareData, hashData } from '../utils/bcript';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(authUser: AuthUserDto) {
    return await this.userService.create(authUser);
  }
  async login({ login, password }: AuthUserDto) {
    const user = await this.prismaService.user.findFirst({ where: { login } });

    if (!user) {
      return null;
    }
    const passwordMatches = await compareData(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  async refresh(userId: string, userToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      return null;
    }

    const refreshTokenMatches = await compareData(userToken, user.refreshToken);

    if (!refreshTokenMatches) {
      return null;
    }

    return user;
  }

  logout(userId: string) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async getTokens({ id: userId, login }: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: String(process.env.JWT_SECRET_KEY),
          expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: String(process.env.JWT_REFRESH_SECRET_KEY),
          expiresIn: String(process.env.TOKEN_REFRESH_EXPIRE_TIME),
        },
      ),
    ]);

    await this.updateUserToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateUserToken(userId: string, token: string) {
    const hashToken = await hashData(token);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: hashToken },
    });
  }
}
