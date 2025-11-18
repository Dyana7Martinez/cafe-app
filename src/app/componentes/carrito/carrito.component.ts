import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { PedidoCarrito, CarritoItem as PedidoItem } from '../../models/carrito-item.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: ItemCarrito[] = [];
  nombreUsuario: string = '';
  mesa: string = '';
  observaciones: string = '';

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(data => this.carrito = data);
  }

  cambiarCantidad(item: ItemCarrito, cantidad: number) {
    this.carritoService.actualizarCantidad(item.producto.id, cantidad);
  }

  eliminar(item: ItemCarrito) {
    this.carritoService.remover(item.producto.id);
  }

  comprar() {
    if (!this.nombreUsuario || !this.mesa) {
      Swal.fire('Error', 'Nombre y número de mesa son obligatorios', 'error');
      return;
    }

    if (this.carrito.length === 0) {
      Swal.fire('Error', 'No hay productos en el carrito', 'error');
      return;
    }

    // Crear los items del pedido según tu modelo
    const itemsPedido: PedidoItem[] = this.carrito.map(i => new PedidoItem(i.producto, i.cantidad));

    // Crear el pedido completo
    const pedido = new PedidoCarrito();
    pedido.items = itemsPedido;
    pedido.totalPedido = itemsPedido.reduce((sum, item) => sum + item.total, 0);
    pedido.timestamp = new Date().toISOString();
    pedido.usuarioId = this.nombreUsuario;

    // Guardar en Firebase
    this.pedidoService.createData('pedidos', pedido).subscribe(() => {
      Swal.fire('¡Pedido realizado!', 'Tu pedido se guardó correctamente.', 'success');
      this.carritoService.vaciar();
      this.nombreUsuario = '';
      this.mesa = '';
      this.observaciones = '';
    });
  }

  getTotal(): number {
    return this.carritoService.getTotal();
  }
}
