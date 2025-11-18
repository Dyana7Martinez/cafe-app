import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categorias = ['bebidas-calientes', 'bebidas-frias', 'pasteleria'];
  categoriaActiva = this.categorias[0];
  productos: any[] = [];
  pedido: any = {};

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // Productos de prueba para visualizar el menú
    this.productos = [
      { nombre: 'Café Latte', precio: 2.5, imagen: 'https://via.placeholder.com/300x200?text=Cafe', categoria: 'bebidas-calientes', descripcion: 'Delicioso café con leche' },
      { nombre: 'Cappuccino', precio: 3.0, imagen: 'https://via.placeholder.com/300x200?text=Cappuccino', categoria: 'bebidas-calientes', descripcion: 'Café espumoso y delicioso' },
      { nombre: 'Té Helado', precio: 2.0, imagen: 'https://via.placeholder.com/300x200?text=Te', categoria: 'bebidas-frias', descripcion: 'Refrescante té frío' },
      { nombre: 'Smoothie de Fresa', precio: 3.5, imagen: 'https://via.placeholder.com/300x200?text=Smoothie', categoria: 'bebidas-frias', descripcion: 'Batido saludable y fresco' },
      { nombre: 'Croissant', precio: 1.5, imagen: 'https://via.placeholder.com/300x200?text=Croissant', categoria: 'pasteleria', descripcion: 'Delicioso croissant recién horneado' },
      { nombre: 'Muffin de Chocolate', precio: 2.0, imagen: 'https://via.placeholder.com/300x200?text=Muffin', categoria: 'pasteleria', descripcion: 'Muffin esponjoso y dulce' }
    ];
  }

  productosDe(categoria: string) {
    return this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  }

  abrirModal(producto: any) {
    this.pedido = { ...producto, nombreUsuario: '', mesa: '', observaciones: '' };
    const modalEl = document.getElementById('pedidoModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  guardarPedido() {
    if (!this.pedido.nombreUsuario || !this.pedido.mesa) {
      Swal.fire('Error', 'Nombre y número de mesa son obligatorios', 'error');
      return;
    }

    // Guardar en Firebase usando tu PedidoService
    this.pedidoService.createData('pedidos', this.pedido).subscribe({
      next: () => {
        Swal.fire('¡Pedido agregado a Firebase!', '', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo guardar el pedido', 'error');
        console.error(err);
      }
    });

    // También guardar en carrito local
    this.carritoService.agregar(this.pedido);

    // Cerrar modal
    const modalEl = document.getElementById('pedidoModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
