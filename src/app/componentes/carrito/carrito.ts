import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { PedidoCarrito } from '../../models/pedido-carrito.model';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {

  cartItems: { menu: Menu; quantity: number; total: number }[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(items => {
      this.cartItems = items;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  removeItem(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  async realizarCompra() {
    const pedido = new PedidoCarrito();
    pedido.items = [...this.cartItems];
    pedido.totalPedido = this.total;
    pedido.timestamp = new Date().toISOString();
    pedido.usuarioId = "anonimo";

    await this.carritoService.guardarPedido();
  }
}
