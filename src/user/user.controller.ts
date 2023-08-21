import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { UserService } from './user.service';
import { Auth } from '../utils/decorator/auth.decorator';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Header('Content-Type', 'application/json')
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Header('Content-Type', 'application/json')
  @Post()
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    createUser: CreateUserDto,
  ) {
    return await this.userService.create(createUser);
  }

  @Header('Content-Type', 'application/json')
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    updatePassword: UpdatePasswordDto,
  ) {
    return await this.userService.update(id, updatePassword);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const remove = await this.userService.remove(id);

    if (!remove) {
      throw new NotFoundException('Artist not found');
    }
  }
}
