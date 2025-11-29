import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {

  // Modelo de datos del formulario
  model = {
    email: '',
    password: ''
  };

  // 🔹 Declarar la variable isLoading para usarla en el template
  isLoading: boolean = false;

  constructor(private loginService: LoginService) {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true; // activamos el spinner

    const { email, password } = this.model;

    this.loginService.login(email, password);

    // reset form y desactivar spinner después de un tiempo
    setTimeout(() => {
      this.isLoading = false;
      form.resetForm();
    }, 1500);
  }
}
