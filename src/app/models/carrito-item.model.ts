import { Menu } from './menu.model';

export class CarritoItem {
  menu!: Menu;
  quantity: number = 1;
  total: number = 0;

  constructor(menu?: Menu, quantity: number = 1) {
    if (menu) {
      this.menu = menu;
      this.quantity = quantity;
      this.total = menu.precio * quantity;
    }
  }
}

export class PedidoCarrito {
  items: CarritoItem[] = [];
  totalPedido: number = 0;
  timestamp: string = "";
  usuarioId: string = "";

  constructor() {
    this.timestamp = new Date().toISOString();
  }
}
