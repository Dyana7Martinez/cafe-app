import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';
import { Pedido, Cliente } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-pedidos.html',
  styleUrls: ['./lista-pedidos.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: { key: string, pedido: Pedido }[] = [];
  estados = ['pendiente', 'en cocina', 'entregado'];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data: any) => {
        this.pedidos = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const raw = data[key];
            const cliente = new Cliente(raw.cliente.nombre, raw.cliente.mesa, raw.cliente.observaciones);
            const pedido = new Pedido(cliente);
            pedido.reconstruir(raw);
            this.pedidos.push({ key, pedido });
          }
        }
      },
      error: err => console.error('Error al cargar pedidos:', err)
    });
  }

  cambiarEstado(item: { key: string, pedido: Pedido }, nuevoEstado: string) {
    item.pedido.estado = nuevoEstado;
    this.pedidoService.actualizarPedido(item.key, item.pedido).subscribe({
      next: () => this.cargarPedidos(),
      error: err => console.error('Error al actualizar estado:', err)
    });
  }

  eliminarPedido(item: { key: string, pedido: Pedido }) {
    Swal.fire({
      title: 'Eliminar pedido?',
      text: 'No se puede deshacer',
      icon: 'warning',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.pedidoService.eliminarPedido(item.key).subscribe({
          next: () => this.cargarPedidos(),
          error: err => console.error('Error al eliminar pedido:', err)
        });
      }
    });
  }
}
