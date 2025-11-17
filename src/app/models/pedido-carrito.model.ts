import { Menu } from './menu.model';
import { FormsModule } from '@angular/forms';

export class PedidoCarrito {
  id?: string;
  usuarioId?: string;

  items: {
    menu: Menu;
    quantity: number;
    total: number;
  }[] = [];

  totalPedido: number = 0;
  timestamp: string = new Date().toISOString();

  constructor() {}

  calcularTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  updateTotal() {
    this.totalPedido = this.calcularTotal();
  }
}
