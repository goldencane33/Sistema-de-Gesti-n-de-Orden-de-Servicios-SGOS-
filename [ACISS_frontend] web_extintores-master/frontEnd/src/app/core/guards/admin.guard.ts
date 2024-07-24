import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.estaAutentificado() && authService.esAdmin()){
    return true;
  }
  
  if(authService.estaAutentificado()){
    router.navigate(['home']);
    return false;
  }

  router.navigate(['login']);
  return false;
};


