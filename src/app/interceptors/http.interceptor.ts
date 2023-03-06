import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('evt :>> ', evt);
          if (evt.body && evt.status === 200) {
            this.toasterService.success(evt.url, evt.statusText, {
              positionClass: 'toast-bottom-center',
            });
          }
          if (evt.body && evt.body.success) {
            console.log('ok');
            this.toasterService.success(
              evt.body.success.message,
              evt.body.success.title,
              { positionClass: 'toast-bottom-center' }
            );
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('err :>> ', err);
          try {
            this.toasterService.error(err.message, err.statusText, {
              positionClass: 'toast-bottom-center',
            });
          } catch (e) {
            this.toasterService.error('An error occurred', '', {
              positionClass: 'toast-bottom-center',
            });
          }
          //log error
        }
        return of(err);
      })
    );
  }
}
