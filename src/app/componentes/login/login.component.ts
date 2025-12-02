import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService){}
  login(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.loginService.login(email, password);
    if (form.invalid) {
      // Mostrar alerta de error si el formulario es inválido
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Mostrar alerta de éxito si el formulario es válido
    Swal.fire({
      title: '¡Inicio de Sesión Exitoso!',
      text: 'Bienvenido ',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    // Lógica adicional para procesar los datos del formulario
    console.log('Datos del formulario:', form.value);
  }
  }


