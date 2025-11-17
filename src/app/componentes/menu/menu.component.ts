import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DataService } from '../../services/data.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  productos: Producto[] = [];
  carrito: Producto[] = [];
  categoriaSeleccionada: string = 'calientes';

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCarrito();
  }

  cargarProductos(): void {
    this.dataService.getDataAsArray('productos').subscribe({
      next: (data: Producto[]) => {
        this.productos = data.length > 0 ? data : [
          new Producto('1', 'Café Americano', 'Clásico y aromático', 2.5, 'https://via.placeholder.com/300x200', 'calientes'),
          new Producto('2', 'Latte Macchiato', 'Leche cremosa', 3.5, 'https://via.placeholder.com/300x200', 'calientes'),
        ];
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      }
    });
  }

  cambiarCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
  }

  getProductosPorCategoria(): Producto[] {
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  agregarAlCarrito(producto: Producto): void {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    this.carrito.push({ ...producto });
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    Swal.fire('¡Agregado!', `${producto.nombre} añadido al carrito`, 'success');
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  verCarrito(): void {
    if (this.carrito.length > 0) {
      this.router.navigate(['/carrito']);
    } else {
      Swal.fire('Vacío', 'Agrega algo primero', 'info');
    }
  }

  trackById(index: number, producto: Producto): string {
    return producto.id;
  }
}