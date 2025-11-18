import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';
import { PedidoCarrito } from '../../models/carrito-item.model';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.html',
  styleUrls: ['./lista-pedidos.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: { id: string, data: PedidoCarrito }[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getData('pedidos').subscribe((data: any) => {
      if (data) {
        this.pedidos = Object.keys(data).map(key => ({ id: key, data: data[key] }));
      } else {
        this.pedidos = [];
      }
    });
  }

  eliminarPedido(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.deleteData('pedidos', id).subscribe(() => {
          Swal.fire('Eliminado!', 'El pedido ha sido eliminado.', 'success');
          this.cargarPedidos();
        });
      }
    });
  }

  editarPedido(pedido: { id: string, data: PedidoCarrito }) {
    Swal.fire({
      title: 'Editar nombre de usuario',
      input: 'text',
      inputLabel: 'Nombre',
      inputValue: pedido.data.usuarioId,
      showCancelButton: true,
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const pedidoActualizado = { ...pedido.data, usuarioId: result.value };
        this.pedidoService.updateData('pedidos', pedido.id, pedidoActualizado)
          .then(() => {
            Swal.fire('Guardado!', 'El pedido ha sido actualizado.', 'success');
            this.cargarPedidos();
          });
      }
    });
  }
}
