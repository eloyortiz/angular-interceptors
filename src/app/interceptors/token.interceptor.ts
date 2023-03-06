import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.info('>> en token-interceptor');

    const headers = new HttpHeaders({
      'token-usuario': 'ABCDE123123123123',
    });

    const reqClone = request.clone({
      headers,
    });

    return next.handle(reqClone).pipe(
      tap((resp) => console.log('INTERCEPTOR-TAP resp :>> ', resp)),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('sucedio un error');
    console.log('registrado en log file');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
