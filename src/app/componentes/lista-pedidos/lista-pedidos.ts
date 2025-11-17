import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.html',
  styleUrls: ['./lista-pedidos.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: any[] = [];
  loading: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.loading = true;

    this.pedidoService.getData('pedidos').subscribe({
      next: rawData => {

        // Validación de datos
        if (!rawData || typeof rawData !== 'object') {
          this.pedidos = [];
          this.loading = false;
          return;
        }

        // Índice dinámico
        const data: { [key: string]: any } = rawData;

        // Convertir Firebase object -> array
        this.pedidos = Object.keys(data).map(id => ({
          id,
          ...data[id]
        }));

        this.loading = false;
      },

      error: err => {
        console.error(err);
        this.loading = false;
        Swal.fire("Error", "No se pudieron cargar los pedidos.", "error");
      }
    });
  }

  eliminarPedido(id: string) {
    Swal.fire({
      title: '¿Eliminar Pedido?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {

        this.pedidoService.deleteData('pedidos', id).subscribe({
          next: () => {
            Swal.fire("Eliminado", "Pedido eliminado correctamente.", "success");
            this.cargarPedidos(); // Recargar la lista
          },
          error: () => {
            Swal.fire("Error", "No se pudo eliminar el pedido.", "error");
          }
        });

      }
    });
  }
}
