// src/app/models/pedido.model.ts
export class Cliente {
  constructor(
    public nombre: string,
    public mesa: string,
    public observaciones: string = ''
  ) {}
}

export class PedidoProducto {
  constructor(
    public producto: Producto,
    public cantidad: number = 1,
    public observaciones: string = ''
  ) {}

  aumentar(cantidad: number = 1) {
    this.cantidad += cantidad;
  }

  disminuir(cantidad: number = 1) {
    this.cantidad -= cantidad;
  }
}

export class Producto {
  constructor(
    public id: string,
    public nombre: string,
    public precio: number,
    public imagen: string = '',
    public categoria: string = '',
    public descripcion: string = ''
  ) {}
}

export class Pedido {
  public productos: PedidoProducto[] = [];
  public total: number = 0;
  public fecha: string = '';
  public estado: string = 'pendiente';

  constructor(public cliente: Cliente) {}

  agregarProducto(producto: Producto, cantidad: number = 1, observaciones: string = '') {
    const existe = this.productos.find(
      p => p.producto.id === producto.id && p.observaciones === observaciones
    );
    if (existe) {
      existe.aumentar(cantidad);
    } else {
      this.productos.push(new PedidoProducto(producto, cantidad, observaciones));
    }
    this.calcularTotal();
  }

  eliminarUnidad(productoId: string, observaciones: string = '') {
    const item = this.productos.find(
      p => p.producto.id === productoId && p.observaciones === observaciones
    );
    if (item) {
      item.disminuir();
      if (item.cantidad <= 0) {
        this.productos = this.productos.filter(p => p !== item);
      }
      this.calcularTotal();
    }
  }

  eliminarProducto(productoId: string) {
    this.productos = this.productos.filter(p => p.producto.id !== productoId);
    this.calcularTotal();
  }

  vaciar() {
    this.productos = [];
    this.total = 0;
  }

  calcularTotal(): number {
    this.total = this.productos.reduce(
      (sum, p) => sum + p.producto.precio * p.cantidad,
      0
    );
    return this.total;
  }

  reconstruir(data: any) {
    this.estado = data.estado || 'pendiente';
    this.fecha = data.fecha || '';
    this.total = data.total || 0;
    this.productos = [];
    if (data.productos) {
      for (const p of data.productos) {
        this.productos.push(new PedidoProducto(
          new Producto(p.producto.id, p.producto.nombre, p.producto.precio, p.producto.imagen, p.producto.categoria, p.producto.descripcion),
          p.cantidad,
          p.observaciones
        ));
      }
    }
  }
}
