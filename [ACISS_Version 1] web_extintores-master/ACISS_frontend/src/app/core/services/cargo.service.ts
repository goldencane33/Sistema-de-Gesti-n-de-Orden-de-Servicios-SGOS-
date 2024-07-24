import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  url: string = environment.baseUrl + 'cargo';

  constructor(private http: HttpClient) { }

  ListarTodos() {
    return this.http.get<Cargo[]>( this.url + '/listar');
  }
}
