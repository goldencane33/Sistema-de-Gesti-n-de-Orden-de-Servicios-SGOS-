import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url: string = environment.baseUrl + 'equipo';

  constructor(private http: HttpClient) { }

  ListarTodos() {
    return this.http.get<Equipo[]>( this.url + '/listar');
  }

  GuardarDatos(obj: Equipo): Observable<any> {
    return this.http.post( this.url + '/guardar', obj);
  }
  Eliminar(id: number){
    return this.http.delete( this.url + '/eliminar/' + id);
  }
}
