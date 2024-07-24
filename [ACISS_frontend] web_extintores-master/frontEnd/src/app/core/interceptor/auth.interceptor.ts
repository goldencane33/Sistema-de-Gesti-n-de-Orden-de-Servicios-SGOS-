import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> =>{
  let authReq = request;
  const authService = inject(AuthService);
  const token = authService.getToken();

  if(token != null){
    authReq = authReq.clone({
      setHeaders : {Authorization: `Bearer ${token}` }
    })
  }
  return next(authReq);
}




