import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from '../../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method, body, query } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const contextName = context.getClass().name;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Route: {${url}, ${method}}, Status Code: [${statusCode}], Query: ${JSON.stringify(
            query,
          )}, Body: ${JSON.stringify(body)}`,
          contextName,
        );
      }),
    );
  }
}
