// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { AuthService } from './services/auth.service';
import { CarritoService } from './services/carrito.service';
import { Pedido } from './models/pedido.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  logueado = false;
  rol: string | null = null;
  cantidadCarrito = 0;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCvUynQ4rK4xTKC8yvF0mFRvzVFXcAYBX4",
      authDomain: "cafeteria-app-72612.firebaseapp.com",
      databaseURL: "https://cafeteria-app-72612-default-rtdb.firebaseio.com",
      projectId: "cafeteria-app-72612",
      storageBucket: "cafeteria-app-72612.firebasestorage.app",
      messagingSenderId: "641915931229",
      appId: "1:641915931229:web:391b001044d93073b05bb4",
      measurementId: "G-LV60DLCE7J"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Estado de autenticación
    this.logueado = this.authService.isLogged();
    this.rol = this.authService.getRol();

    // Suscribirse al carrito para calcular cantidad total
    this.carritoService.carrito$.subscribe((pedido: Pedido | null) => {
      this.cantidadCarrito = pedido ? pedido.productos.reduce(
        (total, item) => total + item.cantidad,
        0
      ) : 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.logueado = false;
    this.rol = null;
    this.cantidadCarrito = 0;
    this.router.navigate(['/login']);
  }
}
