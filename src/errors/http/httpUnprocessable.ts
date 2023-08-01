import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpUnprocessable extends HttpException {
  constructor() {
    super('Internal server error', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
