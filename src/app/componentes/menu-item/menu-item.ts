import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="producto.imagen" [alt]="producto.nombre" class="card-img-top">
      <div class="card-body">
        <h5>{{ producto.nombre }}</h5>
        <p>{{ producto.descripcion }}</p>
        <p>$ {{ producto.precio }}</p>
        <button (click)="addToCart.emit(producto)" class="btn btn-primary">Añadir</button>
      </div>
    </div>
  `
})
export class MenuItemComponent {
  @Input() producto!: Producto;
  @Output() addToCart = new EventEmitter<Producto>();
}