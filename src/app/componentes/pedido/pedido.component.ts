// src/app/components/pedido/pedido.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  carrito: ItemCarrito[] = [];
  nombreUsuario: string = '';
  mesa: string = '';
  observaciones: string = '';

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });

    // Cargar datos guardados del cliente
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
      text: item.producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.carritoService.remover(item.producto.id);
        Swal.fire('Eliminado', '', 'success');
      }
    });
  }

  comprar() {
    // Validaciones
    if (this.carrito.length === 0) {
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

    // Crear el pedido para Firebase
    const pedido = {
      items: this.carrito.map(i => ({
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

    // USAMOS .create() que devuelve Promise (el que tienes en tu servicio)
    this.pedidoService.create(pedido)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Pedido enviado!',
          text: `Gracias ${this.nombreUsuario}, tu pedido va a la mesa ${this.mesa}`,
          timer: 4000,
          showConfirmButton: false
        });

        // Guardar datos del cliente para la próxima vez
        this.carritoService.guardarDatosCliente(this.nombreUsuario, this.mesa, this.observaciones);

        // Vaciar carrito
        this.carritoService.vaciar();

        // Volver al menú
        this.router.navigate(['/menu']);
      })
      .catch(err => {
        console.error('Error al enviar pedido:', err);
        Swal.fire('Error', 'No se pudo enviar el pedido', 'error');
      });
  }
}