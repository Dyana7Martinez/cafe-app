import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string): boolean {

    if (email === 'mesero@gmail.com' && password === '123456') {
      localStorage.setItem('rol', 'mesero');
      return true;
    }

    if (email === 'cliente@gmail.com' && password === '123456') {
      localStorage.setItem('rol', 'cliente');
      return true;
    }

    return false;
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  logout() {
    localStorage.removeItem('rol');
  }

  isLogged() {
    return !!localStorage.getItem('rol');
  }
}
