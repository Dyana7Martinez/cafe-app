// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido, Producto, Cliente } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carritoSubject = new BehaviorSubject<Pedido | null>(null);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {}

  iniciarPedido(cliente: Cliente) {
    const pedido = new Pedido(cliente);
    this.carritoSubject.next(pedido);
  }

  getPedido(): Pedido | null {
    return this.carritoSubject.value;
  }

  getCliente(): Cliente | null {
    return this.getPedido()?.cliente || null;
  }

  setCliente(nombre: string, mesa: string, observaciones: string = '') {
    if (!this.getPedido()) {
      this.iniciarPedido(new Cliente(nombre, mesa, observaciones));
    } else {
      const pedido = this.getPedido()!;
      pedido.cliente.nombre = nombre;
      pedido.cliente.mesa = mesa;
      pedido.cliente.observaciones = observaciones;
      this.carritoSubject.next(pedido);
    }
  }

  agregarProducto(producto: Producto, observaciones: string = '', cantidad: number = 1) {
    // Inicializa pedido si no existe
    if (!this.getPedido()) {
      this.iniciarPedido(new Cliente('', ''));
    }
    const pedido = this.getPedido()!;
    pedido.agregarProducto(producto, cantidad, observaciones);
    this.carritoSubject.next(pedido);
  }

  eliminarUnidad(productoId: string, observaciones: string = '') {
    const pedido = this.getPedido();
    if (!pedido) return;
    pedido.eliminarUnidad(productoId, observaciones);
    this.carritoSubject.next(pedido);
  }

  eliminarProducto(productoId: string) {
    const pedido = this.getPedido();
    if (!pedido) return;
    pedido.eliminarProducto(productoId);
    this.carritoSubject.next(pedido);
  }

  vaciarCarrito() {
    const pedido = this.getPedido();
    if (pedido) pedido.vaciar();
    this.carritoSubject.next(null);
  }

  obtenerCantidadEnCarrito(productoId: string, observaciones: string = ''): number {
    const pedido = this.getPedido();
    if (!pedido) return 0;
    const item = pedido.productos.find(p => p.producto.id === productoId && p.observaciones === observaciones);
    return item ? item.cantidad : 0;
  }
}
