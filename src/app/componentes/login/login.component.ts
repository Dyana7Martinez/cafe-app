// src/app/componentes/login/login.component.ts
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
   model: any = { email: '', password: '' };
  constructor(private router: Router) {}

  async login(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email.trim();
    const password = form.value.password;

    this.isLoading = true;

    try {
      // LOGIN CON FIREBASE
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      
      // GUARDAR USUARIO EN LOCALSTORAGE
      const userData = { uid: result.user?.uid, email: result.user?.email };
      localStorage.setItem('user', JSON.stringify(userData));

      // SWEETALERT2 ÉXITO
      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido a BeanFlow!',
        text: `Hola, ${email}`,
        timer: 2000,
        showConfirmButton: false,
        background: '#f8f9fa',
        backdrop: `rgba(146, 105, 78, 0.8)`
      });

      // REDIRIGIR AL MENÚ
      this.router.navigate(['/menu']);

    } catch (error: any) {
      // SWEETALERT2 ERROR (NUNCA MÁS alert() DEL NAVEGADOR)
      let mensaje = 'Correo o contraseña incorrectos';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        mensaje = 'Credenciales incorrectas';
      } else if (error.code === 'auth/too-many-requests') {
        mensaje = 'Demasiados intentos. Intenta más tarde';
      }

      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: mensaje,
        confirmButtonColor: '#92694E'
      });

      form.controls['password'].reset();
    } finally {
      this.isLoading = false;
    }
  }
}