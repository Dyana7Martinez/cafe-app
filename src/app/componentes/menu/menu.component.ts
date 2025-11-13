import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { Router } from '@angular/router'; // Para navegar
import Swal from 'sweetalert2'; // Para alerts

import { DataService } from '../../services/data.service'; // Ajusta path
import { Producto } from '../../producto.model'; // Ajusta path

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
  categoriaSeleccionada: string = 'calientes'; // ✅ Propiedad agregada (resuelve TS2339)

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCarrito();
  }

  cargarProductos(): void {
    this.dataService.getData('productos').subscribe((data: any) => {
      if (data) {
        this.productos = Object.keys(data).map(key => new Producto(key, data[key].nombre, data[key].descripcion, data[key].precio, data[key].imagen, data[key].categoria || 'calientes'));
      } else {
        // Fallback con categorías
        this.productos = [
          new Producto('1', 'Café Americano', 'Clásico y aromático', 2.5, 'https://via.placeholder.com/300x200?text=Café+Americano', 'calientes'),
          new Producto('2', 'Latte Macchiato', 'Leche cremosa con espresso', 3.5, 'https://via.placeholder.com/300x200?text=Latte', 'calientes'),
          new Producto('3', 'Croissant', 'Pastelería fresca horneada', 1.8, 'https://via.placeholder.com/300x200?text=Croissant', 'comida'),
          new Producto('4', 'Iced Latte', 'Latte frío refrescante', 3.0, 'https://via.placeholder.com/300x200?text=Iced+Latte', 'frias'),
          new Producto('5', 'Smoothie de Frutas', 'Bebida saludable y fresca', 4.0, 'https://via.placeholder.com/300x200?text=Smoothie', 'bebidas')
        ];
      }
    }, (error: any) => {
      console.error('Error:', error);
    });
  }

  // ✅ Método para cambiar categoría (para tabs en HTML)
  cambiarCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
  }

  // ✅ Filtrar productos por categoría (usa en *ngFor del HTML)
  getProductosPorCategoria(): Producto[] {
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  agregarAlCarrito(producto: Producto): void {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const existente = this.carrito.find(item => item.id === producto.id);
    if (existente) {
      Swal.fire('Actualizado', `${producto.nombre} agregado de nuevo.`, 'info');
    } else {
      this.carrito.push({ ...producto });
      Swal.fire('¡Agregado!', `${producto.nombre} en el carrito.`, 'success');
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  verCarrito(): void {
    if (this.carrito.length > 0) {
      this.router.navigate(['/pedido']);
    } else {
      Swal.fire('Vacío', '¡Agrega algo primero!', 'info');
    }
  }

  trackById(index: number, producto: Producto): string {
    return producto.id;
  }
}