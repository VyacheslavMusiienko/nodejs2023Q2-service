import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  id: string;
  oldPassword: string;
  newPassword: string;
  updatedAt: number;
}
