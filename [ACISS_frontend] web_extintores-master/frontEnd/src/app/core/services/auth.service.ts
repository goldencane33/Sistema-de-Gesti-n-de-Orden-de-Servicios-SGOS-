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

  setToken(token:any){
    localStorage.setItem('token',token);
  }

  setExpira(expira:any){
    localStorage.setItem('expira',expira);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRol(){
    let usuario = this.getUsuario();
    if(usuario != null){
      if(usuario.cargo != null){
        return usuario.cargo.nombre;
      }
    }
    return null;
  }

  esAdmin(){
    let nomRol = this.getRol();
    if(nomRol == 'Administrador'){
      return true;
    }
    return false;
  }

  esTecnico(){
    let nomRol = this.getRol();
    if(nomRol == 'Tecnico'){
      return true;
    }
    return false;
  }

  validarExpiracionToken(){
    if (localStorage.getItem('expira') == null) {
      return false;
    }
    const expiracion = new Date(localStorage.getItem('expira')!);
    return (expiracion > new Date());
  }

  removerLogin(){
    localStorage.removeItem('expira');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
