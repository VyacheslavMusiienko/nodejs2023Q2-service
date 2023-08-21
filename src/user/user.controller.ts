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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { Auth } from '../utils/decorator/auth.decorator';
import { ResponseMessages } from '../utils/enum/responseMessage';
import { NotFoundInterceptor } from '../utils/interceptor/notFound.interceptor';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Header('Content-Type', 'application/json')
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Get User By Id' })
  @ApiOkResponse({ description: 'Found user' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('User'))
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'New user is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post()
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    createUser: CreateUserDto,
  ) {
    return await this.userService.create(createUser);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Update User by ID' })
  @ApiOkResponse({ description: 'User updated' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiForbiddenResponse({ description: ResponseMessages.WRONG_PASSWORD })
  @UseInterceptors(new NotFoundInterceptor('User'))
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
  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: `User ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const remove = await this.userService.remove(id);

    if (!remove) {
      throw new NotFoundException('Artist not found');
    }
  }
}
