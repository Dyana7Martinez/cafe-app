import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { Router } from '@angular/router'; // Para navegar
import Swal from 'sweetalert2'; // Para alerts (instala si no: npm i sweetalert2)

import { PedidoService } from '../../services/pedido.service'; // Ajusta path si varía
import { PedidoCarrito } from '../../pedido-carrito.model'; // ✅ Import del model (resuelve ts(2307))
import { Producto } from '../../producto.model'; // Para carrito (resuelve tipado)

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  carrito: Producto[] = []; // ✅ Tipado con Producto[]

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  // ✅ Cargar carrito desde localStorage
  cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  // ✅ Eliminar item del carrito (con confirmación Swal)
  eliminarItem(id: string): void {
    Swal.fire({
      title: '¿Eliminar este item?',
      text: 'No podrás revertirlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remueve del array
        this.carrito = this.carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualiza localStorage

        Swal.fire('Eliminado!', 'Item removido del carrito.', 'success');
        this.cargarCarrito(); // Recarga UI para actualizar total
      }
    });
  }

  // ✅ Calcular total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  // ✅ Confirmar pedido (tipado con PedidoCarrito, resuelve TS2345)
  confirmarPedido(): void {
    if (this.carrito.length > 0) {
      const pedidoData: PedidoCarrito = { // ✅ Tipado correcto (resuelve TS2345)
        id: Date.now().toString(), // ID único
        items: this.carrito, // Array de productos
        totalPedido: this.calcularTotal(), // Total calculado
        timestamp: new Date().toISOString(), // Fecha
        usuarioId: localStorage.getItem('userId') || 'anonimo', // Opcional, de localStorage
        calcularTotal: () => this.calcularTotal() // Método opcional
      };

      // ✅ Subscribe con tipado (resuelve errores en subscribe)
      this.pedidoService.createData('pedidos', pedidoData).subscribe(
        (response: any) => { // ✅ Tipa response: any
          Swal.fire('¡Éxito!', 'Pedido confirmado. Gracias por tu orden.', 'success');
          localStorage.removeItem('carrito');
          this.carrito = [];
          this.router.navigate(['/inicio']);
        },
        (error: any) => { // ✅ Tipa error: any (resuelve TS7006)
          Swal.fire('Error', 'No se pudo confirmar el pedido. Intenta de nuevo.', 'error');
          console.error('Error confirmando:', error);
        }
      );
    } else {
      Swal.fire('Carrito Vacío', 'Agrega items al carrito primero.', 'info');
    }
  }

  // ✅ TrackBy para *ngFor eficiente
  trackById(index: number, item: Producto): string {
    return item.id;
  }
}