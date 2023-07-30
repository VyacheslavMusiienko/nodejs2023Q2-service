import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
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

  @Header('Content-Type', 'application/json')
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError();
      }

      throw new HttpNotFound();
    }
  }

  @Header('Content-Type', 'application/json')
  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }

  @Header('Content-Type', 'application/json')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      return await this.userService.update(id, updatePassword);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      } else if (error instanceof AuthError) {
        throw new AuthError();
      }

      throw new HttpServerError();
    }
  }

  @Header('Content-Type', 'application/json')
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
