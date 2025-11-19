// src/app/components/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  items: ItemCarrito[] = [];
  nombreUsuario: string = '';
  mesa: string = '';
  observaciones: string = '';

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los items del carrito
    this.carritoService.carrito$.subscribe(items => {
      this.items = items;
    });

    // Cargar información guardada
    const cliente = this.carritoService.obtenerDatosCliente();
    if (cliente) {
      this.nombreUsuario = cliente.nombreUsuario || '';
      this.mesa = cliente.mesa || '';
      this.observaciones = cliente.observaciones || '';
    }
  }

  getTotal(): number {
    return this.carritoService.getTotal();
  }

  aumentar(item: ItemCarrito) {
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad + 1);
  }

  disminuir(item: ItemCarrito) {
    if (item.cantidad > 1) {
      this.carritoService.actualizarCantidad(item.producto.id, item.cantidad - 1);
    } else {
      this.eliminar(item);
    }
  }

  eliminar(item: ItemCarrito) {
    Swal.fire({
      title: '¿Eliminar?',
      text: `${item.producto.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.remover(item.producto.id);
        Swal.fire('¡Eliminado!', '', 'success');
      }
    });
  }

  confirmarPedido() {
    if (this.items.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos primero', 'warning');
      return;
    }
    if (!this.nombreUsuario.trim()) {
      Swal.fire('Falta nombre', 'Escribe tu nombre completo', 'warning');
      return;
    }
    if (!this.mesa.trim()) {
      Swal.fire('Falta mesa', 'Indica el número de mesa', 'warning');
      return;
    }

    const pedido = {
      items: this.items.map(i => ({
        producto: {
          id: i.producto.id,
          nombre: i.producto.nombre,
          precio: i.producto.precio
        },
        cantidad: i.cantidad,
        subtotal: i.producto.precio * i.cantidad
      })),
      nombreUsuario: this.nombreUsuario.trim(),
      mesa: this.mesa.trim(),
      observaciones: this.observaciones.trim(),
      total: this.getTotal(),
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };

    this.pedidoService.create(pedido)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Pedido enviado a cocina!',
          text: `Gracias ${this.nombreUsuario}, tu pedido llega pronto a la mesa ${this.mesa}`,
          timer: 4000,
          showConfirmButton: false
        });

        // Guardar datos del cliente
        this.carritoService.guardarDatosCliente(
          this.nombreUsuario,
          this.mesa,
          this.observaciones
        );

        // Limpiar el formulario
        this.nombreUsuario = '';
        this.mesa = '';
        this.observaciones = '';

        // Vaciar carrito
        this.carritoService.vaciar();

        // Redirigir
        this.router.navigate(['/menu']);
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo enviar el pedido. Intenta de nuevo.', 'error');
      });
  }
}
