import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpForbidden extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
