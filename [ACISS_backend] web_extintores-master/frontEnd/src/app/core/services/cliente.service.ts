import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string = environment.baseUrl + 'cliente';

  constructor(private http: HttpClient) { }

  ListarTodos() {
    return this.http.get<Cliente[]>( this.url + '/listar');
  }

  GuardarDatos(obj: Cliente): Observable<any> {
    return this.http.post( this.url + '/guardar', obj);
  }
  Eliminar(id: number){
    return this.http.delete( this.url + '/eliminar/' + id);
  }
}
