import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertaService } from '../services/alerta.service';

export const TokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> =>{
  let authReq = request;
  const auth = inject(AuthService);
  const toast = inject(AlertaService);

  if(!auth.validarExpiracionToken() && auth.estaAutentificado()){
    auth.removerLogin();
    toast.error('La sesión ha caducado!');
    window.location.href = '/login';
  }

  return next(authReq);
}




