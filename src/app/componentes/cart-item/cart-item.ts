import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3">
      <div class="card-body">
        <h5>{{ producto.nombre }}</h5>
        <p>$ {{ producto.precio }}</p>
        <button (click)="remove.emit(producto.id)" class="btn btn-danger">Eliminar</button>
      </div>
    </div>
  `
})
export class CartItemComponent {
  @Input() producto!: Producto;
  @Output() remove = new EventEmitter<string>();
}