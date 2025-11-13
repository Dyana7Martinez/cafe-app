import { Injectable } from '@angular/core';
import { DataService } from './data.service'; // ✅ Nombre correcto, sin "s"

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor(private dataService: DataService) {} // ✅ nombre corregido

  agregarProducto(producto: any) {
    this.carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  obtenerCarrito() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
    return this.carrito;
  }

  eliminarProducto(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  vaciarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  async guardarPedido(pedido: any) {
    await this.dataService.createData('pedidos', pedido);
  }
}
