export class Cliente {
  constructor(
    public nombre: string,
    public mesa: string,
    public observaciones: string = ''
  ) {}
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

  calcularTotal(): number {
    this.total = this.productos.reduce(
      (sum, p) => sum + p.producto.precio * p.cantidad,
      0
    );
    return this.total;
  }
}
