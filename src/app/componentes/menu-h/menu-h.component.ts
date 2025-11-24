// src/app/componentes/menu-h/menu-h.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-menu-h',
  standalone: true,
  templateUrl: './menu-h.component.html',
  styleUrls: ['./menu-h.component.css']
})
export class MenuHComponent {
  @Input() producto!: Producto;
  @Input() cantidad: number = 0;

  @Output() elegir = new EventEmitter<Producto>();
  @Output() incrementar = new EventEmitter<Producto>();
  @Output() decrementar = new EventEmitter<Producto>();

  incrementarCantidad() {
    this.incrementar.emit(this.producto);
  }

  decrementarCantidad() {
    this.decrementar.emit(this.producto);
  }

  elegirProducto() {
    this.elegir.emit(this.producto);
  }
}
