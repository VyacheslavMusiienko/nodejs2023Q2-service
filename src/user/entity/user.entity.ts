import { Exclude, Transform } from 'class-transformer';

export class User {
  readonly id: string;
  readonly login: string;
  readonly refreshToken: string;

  @Exclude()
  readonly password: string;
  readonly version: number;

  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  readonly createdAt: Date;

  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  readonly updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
