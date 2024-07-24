import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  url: string = environment.baseUrl + 'trabajador';

  constructor(private http: HttpClient) { }

  ListarTodos() {
    return this.http.get<Trabajador[]>( this.url + '/listar');
  }

  GuardarDatos(obj: Trabajador): Observable<any> {
    return this.http.post( this.url + '/guardar', obj);
  }
  Eliminar(id: number){
    return this.http.delete( this.url + '/eliminar/' + id);
  }
}
