import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { PedidoService } from './pedido.service';
import { Menu} from '../models/menu.model';
import { PedidoCarrito } from '../models/pedido-carrito.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: PedidoCarrito["items"] = [];
  private carritoSubject = new BehaviorSubject<PedidoCarrito["items"]>([]);

  constructor(private pedidoService: PedidoService) {
    const datos = localStorage.getItem("carrito");
    if (datos) {
      this.carrito = JSON.parse(datos);
      this.carritoSubject.next(this.carrito);
    }
  }

  agregarProducto(menu: Menu, quantity: number = 1) {

    if (quantity <= 0) {
      Swal.fire("Error", "Cantidad inválida", "warning");
      return;
    }

    const index = this.carrito.findIndex(item => item.menu.id === menu.id);
    const subtotal = menu.price * quantity;

    if (index >= 0) {
      this.carrito[index].quantity += quantity;
      this.carrito[index].total += subtotal;
    } else {
      this.carrito.push({
        menu,
        quantity,
        total: subtotal
      });
    }

    this.updateLocalStorage();
    this.carritoSubject.next([...this.carrito]);

    Swal.fire("Agregado", `${menu.name} agregado al carrito.`, "success");
  }

  obtenerCarrito(): Observable<PedidoCarrito["items"]> {
    return this.carritoSubject.asObservable();
  }

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
      this.updateLocalStorage();
      this.carritoSubject.next([...this.carrito]);
      Swal.fire("Eliminado", "Producto eliminado del carrito.", "success");
    }
  }

  vaciarCarrito() {
    this.carrito = [];
    this.updateLocalStorage();
    this.carritoSubject.next([]);
  }

  getTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.total, 0);
  }

  async guardarPedido() {
    try {
      const total = this.getTotal();

      const pedido = new PedidoCarrito();
      pedido.items = [...this.carrito];
      pedido.totalPedido = total;
      pedido.timestamp = new Date().toISOString();
      pedido.usuarioId = "anonimo";

      await firstValueFrom(
        this.pedidoService.createData("pedidos", pedido)
      );

      this.vaciarCarrito();

      Swal.fire("Pedido Confirmado", `Total: $${total}`, "success");

    } catch (error) {
      console.error("Error al guardar pedido:", error);
      Swal.fire("Error", "No se pudo guardar el pedido.", "error");
    }
  }

  private updateLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
}
