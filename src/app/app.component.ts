import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'interceptorApp';
  data$ = new Observable();

  constructor(private usuariosService: UsuariosService) {
    this.data$ = this.usuariosService.obtenerUsuarios();

    this.data$.subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log('error en el appComponent: ', err);
      }
    );
  }
}
