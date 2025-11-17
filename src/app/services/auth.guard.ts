import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,  // corregido
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si está autenticado, permitir acceso
      return true;
    } else {
      // Si NO está autenticado, enviar al login
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: window.location.pathname }
      });

      return false;
    }
  }
}
