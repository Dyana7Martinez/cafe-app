import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  categoriaActual: string = 'calientes';

  cantidadPorProducto: { [key: string]: number } = {};

  productoSeleccionado: any = null;
  cantidad: number = 1;
  nombreUsuario: string = '';
  mesa: string = '';
  observaciones: string = '';

  productos = [
    {
      id: '1',
      nombre: 'Café Americano',
      precio: 2.50,
      imagen: 'assets/images/productos/cafe americano.png',
      categoria: 'calientes',
      descripcion: 'Café negro intenso y aromático'
    },
    {
      id: '2',
      nombre: 'Cappuccino',
      precio: 3.00,
      imagen: 'assets/images/productos/capuchino.png',
      categoria: 'calientes',
      descripcion: 'Espresso con leche vaporizada y espuma'
    }
  ];

  categorias = [
    { id: 'calientes', nombre: 'Bebidas Calientes' },
    { id: 'frias', nombre: 'Bebidas Frías' },
    { id: 'dulces', nombre: 'Dulces y Pastelería' }
  ];

  constructor(private carritoService: CarritoService) {
    const cliente = this.carritoService.obtenerDatosCliente();
    if (cliente) {
      this.nombreUsuario = cliente.nombreUsuario || '';
      this.mesa = cliente.mesa || '';
      this.observaciones = cliente.observaciones || '';
    }
  }

  get productosFiltrados() {
    return this.productos.filter(p => p.categoria === this.categoriaActual);
  }

  incrementar(producto: any) {
    if (!this.cantidadPorProducto[producto.id]) {
      this.cantidadPorProducto[producto.id] = 1;
    }
    this.cantidadPorProducto[producto.id]++;
  }

  decrementar(producto: any) {
    if (!this.cantidadPorProducto[producto.id] || this.cantidadPorProducto[producto.id] <= 1) {
      this.cantidadPorProducto[producto.id] = 1;
    } else {
      this.cantidadPorProducto[producto.id]--;
    }
  }

  obtenerCantidad(producto: any): number {
    return this.cantidadPorProducto[producto.id] || 1;
  }

  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
    this.cantidad = this.obtenerCantidad(producto);
    $('#pedidoModal').modal('show');
  }

  cancelar() {
    $('#pedidoModal').modal('hide');
  }

  agregarConCantidad() {
    if (!this.nombreUsuario.trim()) {
      Swal.fire('Falta nombre', 'Por favor escribe tu nombre', 'warning');
      return;
    }
    if (!this.mesa.trim()) {
      Swal.fire('Falta mesa', 'Indica el número de mesa', 'warning');
      return;
    }

    this.carritoService.guardarDatosCliente(
      this.nombreUsuario,
      this.mesa,
      this.observaciones
    );

    this.carritoService.agregar(this.productoSeleccionado, this.cantidad);

    this.cantidadPorProducto[this.productoSeleccionado.id] = 1;

    // 🔥 LIMPIAR FORMULARIO DESPUÉS DE AGREGAR
    this.nombreUsuario = '';
    this.mesa = '';
    this.observaciones = '';
    this.cantidad = 1;

    $('#pedidoModal').modal('hide');
  }
}
