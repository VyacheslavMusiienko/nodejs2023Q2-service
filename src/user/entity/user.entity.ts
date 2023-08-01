import { Exclude } from 'class-transformer';

export class User {
  readonly id: string;
  readonly login: string;

  @Exclude()
  readonly password: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
