export class PedidoCarrito {
  id?: string;
  usuarioId?: string;
  items?: any[];
  totalPedido?: number;
  timestamp?: string;

  constructor(items?: any[]) {
    this.items = items;
    this.timestamp = new Date().toISOString();
  }

  calcularTotal(): number { // ✅ Método requerido si lo usas
    return this.items ? this.items.reduce((total, item) => total + item.precio, 0) : 0;
  }
}