import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../../logger/logger.service';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(
    private readonly logger: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  async catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const { url, method } = ctx.getRequest();
    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? exception['response']['message']
      : String(exception);

    const name = isHttpException && exception.name;
    const responseBody = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: url,
    };

    await this.logger.error(
      `Route: {${url}, ${method}}, Status Code: [${statusCode}], Message: '${message}'`,
      name,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
