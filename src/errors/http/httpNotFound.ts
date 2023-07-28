import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpNotFound extends HttpException {
  constructor() {
    super('Not found', HttpStatus.NOT_FOUND);
  }
}
