// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  logueado = false;
  email = '';
  cantidadCarrito = 0; // ahora SE ACTUALIZA AUTOMÁTICAMENTE

  constructor(
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // ============================
    //   INICIALIZAR FIREBASE
    // ============================
    const firebaseConfig = {
      apiKey: "AIzaSyCvUynQ4rK4xTKC8yvF0mFRvzVFXcAYBX4",
      authDomain: "cafeteria-app-72612.firebaseapp.com",
      projectId: "cafeteria-app-72612",
      storageBucket: "cafeteria-app-72612.appspot.com",
      messagingSenderId: "1087741282351",
      appId: "1:1087741282351:web:8c5d3e8f9b8e8f9b8e8f9b"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // ============================
    //   DETECTAR LOGIN
    // ============================
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.logueado = true;
      this.email = userData.email || 'Usuario';
    }

    // ============================
    //   SUSCRIPCIÓN AL CARRITO
    // ============================
    this.carritoService.carrito$.subscribe(items => {
      this.cantidadCarrito = items.reduce((sum, item) => sum + item.cantidad, 0);
    });
  }

  // =============================
  //   CERRAR SESIÓN
  // =============================
  logout() {
    localStorage.removeItem('user');
    this.logueado = false;
    this.email = '';
    this.cantidadCarrito = 0;
    this.router.navigate(['/login']);
  }
}
