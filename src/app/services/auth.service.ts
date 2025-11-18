// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Simulación de usuarios válidos (para que funcione YA)
  private usuariosValidos = [
    { email: 'admin@beanflow.com', password: '123456' },
    { email: 'user@beanflow.com',   password: '123456' },
    { email: 'test@beanflow.com',   password: '123456' }
  ];

  async login(email: string, password: string): Promise<boolean> {
    // Simula delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const usuario = this.usuariosValidos.find(u => u.email === email && u.password === password);

    if (usuario) {
      // GUARDA QUE ESTÁ LOGUEADO
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('logueado', 'true');
      
      // Redirige al menú o dashboard
      this.router.navigate(['/menu']);
      return true;
    } else {
      alert('Correo o contraseña incorrectos');
      return false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('logueado');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}