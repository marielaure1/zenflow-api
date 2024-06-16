import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from 'express';
import ResponsesHelper from '@helpers/responses.helpers';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly responsesHelper: ResponsesHelper) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      catchError((error) => {
        return throwError(() =>
          this.responsesHelper.getResponse({
            res: response,
            path: request.url,
            method: request.method,
            code: error.status || 500,
            subject: 'Error',
            data: error.message || 'An unexpected error occurred',
          })
        );
      })
    );
  }
}
