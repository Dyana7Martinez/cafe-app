// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

export class ItemCarrito {
  producto: any;      // producto = { id, nombre, precio, imagen, ... }
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    this.cargarDelLocalStorage(); // Para mantener el carrito al recargar la página
  }

  // ========================================
  // AGREGAR PRODUCTO
  // ========================================
  agregar(producto: any, cantidad: number = 1) {
    const existe = this.items.find(i => i.producto.id === producto.id);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }

    this.guardarEnLocalStorage();
    this.actualizar();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${producto.nombre} agregado`,
      showConfirmButton: false,
      timer: 1500
    });
  }

  // ========================================
  // ELIMINAR PRODUCTO COMPLETO
  // ========================================
  remover(id: string) {
    this.items = this.items.filter(i => i.producto.id !== id);
    this.guardarEnLocalStorage();
    this.actualizar();
  }

  // ========================================
  // CAMBIAR CANTIDAD (+ / -)
  // ========================================
  actualizarCantidad(id: string, cantidad: number) {
    if (cantidad <= 0) {
      this.remover(id);
      return;
    }
    const item = this.items.find(i => i.producto.id === id);
    if (item) {
      item.cantidad = cantidad;
      this.guardarEnLocalStorage();
      this.actualizar();
    }
  }

  // ========================================
  // VACIAR CARRITO
  // ========================================
  vaciar() {
    this.items = [];
    localStorage.removeItem('beanflow-carrito');
    this.actualizar();
  }

  // ========================================
  // GETTERS
  // ========================================
  getItems(): ItemCarrito[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((t, i) => t + (i.producto.precio * i.cantidad), 0);
  }

  getCantidadItems(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  // ========================================
  // LOCALSTORAGE (para persistencia)
  // ========================================
  private guardarEnLocalStorage() {
    localStorage.setItem('beanflow-carrito', JSON.stringify(this.items));
  }

  private cargarDelLocalStorage() {
    const data = localStorage.getItem('beanflow-carrito');
    if (data) this.items = JSON.parse(data);
    this.actualizar();
  }

  private actualizar() {
    this.carritoSubject.next([...this.items]);
  }
}
