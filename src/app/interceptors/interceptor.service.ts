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

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.info('paso por el interceptor');

    const headers = new HttpHeaders({
      'token-usuario': 'ABCDE123123123123',
    });

    const reqClone = req.clone({
      headers,
    });

    return next.handle(reqClone).pipe(
      tap((resp) => console.log('INTERCEPTOR-TAP resp :>> ', resp)),
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.log('sucedio un error');
    console.log('registrado en log file');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
