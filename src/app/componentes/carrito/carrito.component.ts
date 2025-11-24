import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: Pedido | null = null;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(p => this.pedido = p);
  }

  eliminarUnidad(productoId: string, observaciones: string = '') {
    this.carritoService.eliminarUnidad(productoId, observaciones);
  }

  eliminarProducto(productoId: string) {
    this.carritoService.eliminarProducto(productoId);
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  confirmarPedido() {
    if (!this.pedido) return;
    this.pedidoService.crearPedido(this.pedido).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Pedido enviado correctamente', 'success');
        this.carritoService.vaciarCarrito();
      },
      error: err => Swal.fire('Error', 'No se pudo enviar el pedido', 'error')
    });
  }
}
