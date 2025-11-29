import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-h',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-h.component.html',
  styleUrls: ['./carrito-h.component.css']
})
export class CarritoHComponent {

  @Input({ required: true }) pedido!: Pedido;

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService
  ) {}

  eliminar(productoId: string) {
    this.carritoService.eliminarProducto(productoId);
  }

  vaciar() {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.carritoService.vaciarCarrito();
        Swal.fire('Carrito vacío', '', 'success');
      }
    });
  }

  confirmarPedido() {
    if (!this.pedido || this.pedido.productos.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos antes de enviar', 'warning');
      return;
    }

    Swal.fire({
      title: '¡Enviar pedido a cocina!',
      html: `
        <strong>Mesa:</strong> ${this.pedido.cliente.mesa}<br>
        <strong>Cliente:</strong> ${this.pedido.cliente.nombre}<br>
        <strong>Total:</strong> $${this.pedido.total.toFixed(2)}
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745'
    }).then(result => {
      if (result.isConfirmed) {
        this.pedidoService.crearPedido(this.pedido).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Enviado!',
              text: 'El pedido está en cocina',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.carritoService.vaciarCarrito();
          },
          error: (err) => {
            console.error('Error al enviar pedido:', err);
            Swal.fire('Error', 'No se pudo enviar el pedido', 'error');
          }
        });
      }
    });
  }

  editarObservaciones(index: number) {
    const producto = this.pedido.productos[index];
    const nuevoTexto = prompt('Editar observaciones:', producto.observaciones);
    if (nuevoTexto !== null) {
      producto.observaciones = nuevoTexto;
      this.pedido.total = this.pedido.calcularTotal();
    }
  }
}
