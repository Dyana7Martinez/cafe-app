import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MenuComponent } from '../menu/menu.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { ListaPedidosComponent } from '../lista-pedidos/lista-pedidos';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, CarritoComponent, ListaPedidosComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userEmail: string = '';
  vistaActual: string = 'home';
  
  constructor(private loginService: LoginService, private router: Router) {
    // Obtener el email del usuario desde localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodificar el token (formato: email:timestamp)
        const decoded = atob(token);
        this.userEmail = decoded.split(':')[0];
      } catch (e) {
        this.userEmail = 'Usuario';
      }
    } else {
      this.userEmail = 'Usuario';
    }
  }
  
  // Cambiar vista
  cambiarVista(vista: string) {
    this.vistaActual = vista;
    console.log('Vista cambiada a:', vista);
  }
  
  // Cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }
}
