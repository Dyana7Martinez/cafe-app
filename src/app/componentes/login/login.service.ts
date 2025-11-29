import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CookieService } from "ngx-cookie-service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = '';
  private rol: string | null = null; // ⚠️ Guardar rol del usuario

  constructor(private router: Router, private cookies: CookieService) {}

  login(email: string, password: string, rol: string = 'cliente') {
    // ⚠️ Puedes pasar el rol al iniciar sesión
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser?.getIdToken()
          .then(token => {
            this.token = token;
            this.rol = rol;
            this.cookies.set('token', token);
            this.cookies.set('rol', rol); // Guardamos rol en cookies

            Swal.fire('Bienvenido', `Hola ${email}`, 'success');
            this.router.navigate(['/']); // Redirige al inicio
          })
          .catch(error => {
            console.error("Error al obtener el token:", error);
            Swal.fire('Error', 'No se pudo obtener el token', 'error');
          });
      })
      .catch(error => {
        console.error("Error de login:", error);
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      });
  }

  getIdToken() {
    return this.cookies.get('token');
  }

  estaLogueado() {
    return !!this.cookies.get('token');
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.token = '';
        this.rol = null;
        this.cookies.delete('token');
        this.cookies.delete('rol');

        Swal.fire('Cerraste sesión', '', 'info');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
        Swal.fire('Error', 'No se pudo cerrar sesión', 'error');
      });
  }

  // ⚠️ Método nuevo para obtener el rol
  getRol(): string | null {
    return this.rol || this.cookies.get('rol') || null;
  }
}
