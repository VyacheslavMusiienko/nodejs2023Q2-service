import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ResponseMessages } from '../enum/responseMessage';

@Injectable()
export class UnEntityInterceptor implements NestInterceptor {
  constructor(private name: string) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (!data || !Object.keys(data).length) {
          throw new UnprocessableEntityException(
            `${this.name} ${ResponseMessages.NOT_FOUND}`,
          );
        }
      }),
    );
  }
}
