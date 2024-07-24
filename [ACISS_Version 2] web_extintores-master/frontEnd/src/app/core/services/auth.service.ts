import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.baseUrl + 'auth';

  constructor(private http: HttpClient) { }

  login(obj: any): Observable<any> {
    return this.http.post(this.url + '/login', obj);
  }

  setUsuario(obj:any){
    localStorage.setItem('usuario', JSON.stringify(obj));
  }

  estaAutentificado(){
    return this.getUsuario() != null;
  }

  getUsuario(){
    let userStr = localStorage.getItem('usuario');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      return null;
    }
  }

  removerLogin(){
    localStorage.removeItem('usuario');
  }
}
