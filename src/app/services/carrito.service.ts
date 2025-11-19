// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

// EXPORTAMOS LA CLASE PARA QUE TODOS LA VEAN
export class ItemCarrito {
  producto: any;
  cantidad: number = 1;

  constructor(producto: any, cantidad: number = 1) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  public carrito$ = this.carritoSubject.asObservable();

  private readonly KEY_CLIENTE = 'beanflow_ultimo_cliente';
  private readonly KEY_CARRITO = 'beanflow_carrito';

  constructor() {
    this.cargarDelLocalStorage();
  }

  agregar(producto: any, cantidad: number = 1) {
    const existe = this.items.find(i => i.producto.id === producto.id);
    if (existe) {
      existe.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
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

  remover(id: string) {
    this.items = this.items.filter(i => i.producto.id !== id);
    this.guardarEnLocalStorage();
    this.actualizar();
  }

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

  vaciar() {
    this.items = [];
    localStorage.removeItem(this.KEY_CARRITO);
    this.actualizar();
  }

  getItems(): ItemCarrito[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  getCantidadItems(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  // DATOS DEL CLIENTE
  guardarDatosCliente(nombre: string, mesa: string, observaciones: string = '') {
    const datos = {
      nombreUsuario: nombre.trim(),
      mesa: mesa.trim(),
      observaciones: observaciones.trim()
    };
    localStorage.setItem(this.KEY_CLIENTE, JSON.stringify(datos));
  }

  obtenerDatosCliente(): any {
    const data = localStorage.getItem(this.KEY_CLIENTE);
    return data ? JSON.parse(data) : null;
  }

  // LOCALSTORAGE
  private guardarEnLocalStorage() {
    localStorage.setItem(this.KEY_CARRITO, JSON.stringify(this.items));
  }

  private cargarDelLocalStorage() {
    const data = localStorage.getItem(this.KEY_CARRITO);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.items = parsed.map((i: any) => new ItemCarrito(i.producto, i.cantidad));
      } catch (e) {
        console.error('Error cargando carrito', e);
        this.items = [];
      }
    }
    this.actualizar();
  }

  private actualizar() {
    this.carritoSubject.next([...this.items]);
  }
}