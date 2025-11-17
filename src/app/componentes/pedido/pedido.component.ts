// src/app/componentes/pedido/pedido.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  selectedItems: { name: string; price: number; quantity: number }[] = [];
  showOrderForm: boolean = false;
  currentItem: { name: string; price: number; quantity: number } | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí podrías recuperar selectedItems desde un servicio o localStorage si los guardas
    console.log('Pedido cargado:', this.selectedItems);
  }

  confirmOrder() {
    if (this.currentItem) {
      const itemName = this.currentItem.name;
      this.selectedItems.push({ ...this.currentItem });
      this.currentItem = null;
      this.showOrderForm = false;
      alert(`Producto ${itemName} agregado al pedido.`);
    }
  }

  calculateTotal(): number {
    return this.selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  confirmPurchase() {
    if (confirm('¿Estás seguro de realizar la compra?')) {
      const total = this.calculateTotal();
      const orderDate = new Date().toLocaleString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      alert(`Compra realizada. Total: $${total} MXN. Fecha del pedido: ${orderDate}`);
      this.selectedItems = [];
    }
  }
}