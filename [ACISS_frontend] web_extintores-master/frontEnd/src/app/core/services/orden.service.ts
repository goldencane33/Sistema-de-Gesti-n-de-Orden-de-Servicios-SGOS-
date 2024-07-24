import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  url: string = environment.baseUrl + 'orden';

  constructor(private http: HttpClient) { }

  GuardarDatos(obj: Orden): Observable<any> {
    return this.http.post( this.url + '/guardar', obj);
  }

  ListarTodos() {
    return this.http.get<Orden[]>( this.url + '/listar');
  }

  ListarPendientes(id: number) {
    return this.http.get<Orden[]>( this.url + '/listarPendientes/'+ id);
  }

  AtenderOrden(id: number): Observable<any> {
    return this.http.get( this.url + '/atenderOrden/' + id);
  }
}
