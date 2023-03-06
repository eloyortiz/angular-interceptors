import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    let isFake = false;
    const API_URL = isFake
      ? 'https://reqres1231231231.in/api/user'
      : 'https://reqres.in/api/user';
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'JohnDoe');

    //TODO: is move to interceptor
    // const headers = new HttpHeaders({
    //   'token-usuario': 'ABCDE123123123123',
    // });

    return this.http
      .get(API_URL, {
        params,
        //headers,
      })
      .pipe(
        //tap((resp) => console.log('TAP resp :>> ', resp)),
        map((resp) => resp['data'])
        //TODO: is move to interceptor
        // catchError(this.manejarError)
      );
  }

  //TODO: is move to interceptor
  // manejarError(error: HttpErrorResponse) {
  //   console.log('sucedio un error');
  //   console.log('registrado en log file');
  //   console.warn(error);
  //   return throwError('Error personalizado');
  // }
}
