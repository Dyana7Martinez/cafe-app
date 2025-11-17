import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null; // Usuario actual

  constructor(private auth: Auth) {
    // Escucha cambios de auth state al inicializar
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  // Login
  login(email: string, password: string): Observable<User | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(result => result.user),
      tap(() => Swal.fire('¡Bienvenido!', 'Sesión iniciada.', 'success')),
      catchError(error => {
        Swal.fire('Error', `Login falló: ${error.message}`, 'error');
        return throwError(() => error);
      })
    );
  }

  // Registro
  register(email: string, password: string): Observable<User | null> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(result => result.user),
      tap(() => Swal.fire('¡Registrado!', 'Cuenta creada. Inicia sesión.', 'success')),
      catchError(error => {
        Swal.fire('Error', `Registro falló: ${error.message}`, 'error');
        return throwError(() => error);
      })
    );
  }

  // Logout
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.user = null;
        Swal.fire('Logout', 'Sesión cerrada.', 'info');
      })
    );
  }

  // ¿Está logueado? (para guards)
  isLoggedIn(): boolean {
    return !!this.user;
  }

  // Obtén user ID para guardar en pedidos (e.g., /pedidos/{userId})
  getUserId(): string | null {
    return this.user?.uid || null;
  }
}