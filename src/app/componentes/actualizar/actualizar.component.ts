import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  id: string = '';
  pedido!: Pedido;
  estados = ['pendiente', 'en cocina', 'entregado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) {
      Swal.fire('Error', 'ID del pedido no válido', 'error');
      this.router.navigate(['/lista-pedidos']);
      return;
    }

    this.pedidoService.obtenerPedidos().subscribe({
      next: data => {
        const raw = data[this.id];
        if (raw) {
          this.pedido = new Pedido(raw.cliente);
          this.pedido.reconstruir(raw);
        } else {
          Swal.fire('No encontrado', 'Pedido no existe', 'warning');
          this.router.navigate(['/lista-pedidos']);
        }
      },
      error: err => Swal.fire('Error', 'No se pudo cargar pedido', 'error')
    });
  }

  cambiarCantidad(index: number, cantidad: number) {
    if (cantidad < 1) cantidad = 1;
    this.pedido.productos[index].cantidad = cantidad;
    this.pedido.total = this.pedido.calcularTotal();
  }

  eliminarProducto(index: number) {
    const prodId = this.pedido.productos[index].producto.id;
    this.pedido.eliminarProducto(prodId);
  }

  actualizar() {
    this.pedidoService.actualizarPedido(this.id, this.pedido).subscribe({
      next: () => {
        Swal.fire('¡Actualizado!', 'Pedido guardado', 'success');
        this.router.navigate(['/lista-pedidos']);
      },
      error: err => Swal.fire('Error', 'No se pudo actualizar', 'error')
    });
  }
}
