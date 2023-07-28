import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UuidDto } from '../common/uuid.dto';
import { AuthError } from '../errors/auth';
import { HttpNotFound } from '../errors/http/httpNotFound';
import { HttpServerError } from '../errors/http/httpServer';
import { NotFoundError } from '../errors/notFound';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) { id }: UuidDto) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError();
      }

      throw new HttpNotFound();
    }
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) { id }: UuidDto,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      return this.userService.update(id, updatePassword);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      } else if (error instanceof AuthError) {
        throw new AuthError();
      }

      throw new HttpServerError();
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) { id }: UuidDto) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
