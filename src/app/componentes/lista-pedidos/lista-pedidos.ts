// src/app/componentes/lista-pedidos/lista-pedidos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

interface Pedido {
  id: string;
  nombreUsuario: string;
  mesa: string;
  total: number;
  estado: string;
  fecha: string;
  items: any[];
  observaciones?: string;
}

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.html',
  styleUrls: ['./lista-pedidos.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  cargando = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.cargando = true;
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando pedidos:', err);
        Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
        this.cargando = false;
      }
    });
  }

  eliminarPedido(id: string) {
    Swal.fire({
      title: '¿Eliminar pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.pedidoService.delete(id).then(() => {
          Swal.fire('¡Eliminado!', 'El pedido ha sido borrado.', 'success');
          this.cargarPedidos();
        }).catch(() => {
          Swal.fire('Error', 'No se pudo eliminar', 'error');
        });
      }
    });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: 'preparando' | 'listo' | 'entregado') {
    this.pedidoService.update(pedido.id, { estado: nuevoEstado })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Estado actualizado',
          text: `Pedido ahora está: ${nuevoEstado.toUpperCase()}`,
          timer: 2000,
          showConfirmButton: false
        });
        this.cargarPedidos();
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
      });
  }
}