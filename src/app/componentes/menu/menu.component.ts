import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { MenuHComponent } from '../menu-h/menu-h.component';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/pedido.model';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuHComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewChecked {

  productos: Producto[] = [
    { id: '1', nombre: 'Café Espresso', precio: 5, imagen: 'assets/cafe.jpg', categoria: 'Bebidas calientes', descripcion: 'Intenso y aromático' },
    { id: '2', nombre: 'Capuchino', precio: 7, imagen: 'assets/capuchino.jpg', categoria: 'Bebidas calientes', descripcion: 'Con espuma cremosa' },
    { id: '3', nombre: 'Ensalada César', precio: 12, imagen: 'assets/ensalada.jpg', categoria: 'Comidas', descripcion: 'Fresca y deliciosa' },
    { id: '4', nombre: 'Té Verde', precio: 4, imagen: 'assets/te.jpg', categoria: 'Bebidas Frias', descripcion: 'Refrescante' },
    { id: '5', nombre: 'Croissant', precio: 6, imagen: 'assets/croissant.jpg', categoria: 'Postres', descripcion: 'Mantecoso y crujiente' }
  ];

  productosFiltrados: Producto[] = this.productos;

  categorias = [
    { id: 'Bebidas calientes', nombre: 'Bebidas calientes' },
    { id: 'Bebidas Frias', nombre: 'Bebidas frías' },
    { id: 'Postres', nombre: 'Postres' },
    { id: 'Comidas', nombre: 'Comidas' }
  ];

  categoriaActual = 'Bebidas calientes';

  productoSeleccionado: Producto | null = null;
  cantidad = 1;
  nombreUsuario = '';
  mesa = '';
  observaciones = '';

  private modalInstance: any = null;
  private needsDetectChanges = false;

  constructor(
    public carritoService: CarritoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosCliente();
    this.filtrarCategoria(this.categoriaActual);
  }

  ngAfterViewChecked(): void {
    if (this.needsDetectChanges) {
      this.cdr.detectChanges();
      this.needsDetectChanges = false;
    }
  }

  private cargarDatosCliente() {
    const cliente = this.carritoService.getCliente();
    this.nombreUsuario = cliente?.nombre || '';
    this.mesa = cliente?.mesa || '';
    this.observaciones = cliente?.observaciones || '';
  }

  filtrarCategoria(id: string) {
    this.categoriaActual = id;
    this.productosFiltrados = this.productos.filter(p => p.categoria === id);
  }

  obtenerCantidad(producto: Producto): number {
    return this.carritoService.obtenerCantidadEnCarrito(producto.id || '');
  }

  // CONTADORES TARJETA
  incrementar(producto: Producto) {
    if (!this.carritoService.getPedido()) {
      this.carritoService.iniciarPedido(new Cliente('', ''));
    }
    this.carritoService.agregarProducto(producto, '');
    this.needsDetectChanges = true;
  }

  decrementar(producto: Producto) {
    this.carritoService.eliminarUnidad(producto.id || '', '');
    this.needsDetectChanges = true;
  }

  // MODAL
  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.cantidad = this.obtenerCantidad(producto) || 1;
    this.cargarDatosCliente();

    this.cdr.detectChanges();

    const modalEl = document.getElementById('pedidoModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
      this.modalInstance.show();
    }
  }

  cerrarModal() {
    if (this.modalInstance) this.modalInstance.hide();
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

      this.productoSeleccionado = null;
      this.cantidad = 1;
      this.observaciones = '';
      this.needsDetectChanges = true;
    }, 300);
  }

  agregarYlimpiar() {
    if (!this.productoSeleccionado) return;

    // Guardar cliente la primera vez
    if (!this.carritoService.getCliente()?.nombre) {
      if (!this.nombreUsuario.trim() || !this.mesa.trim()) {
        Swal.fire('Error', 'Nombre y mesa son obligatorios', 'error');
        return;
      }
      this.carritoService.setCliente(
        this.nombreUsuario.trim(),
        this.mesa.trim(),
        this.observaciones.trim()
      );
    }

    // Ajustar cantidad en carrito
    const enCarrito = this.obtenerCantidad(this.productoSeleccionado);
    const diferencia = this.cantidad - enCarrito;

    if (diferencia > 0) {
      for (let i = 0; i < diferencia; i++) {
        this.carritoService.agregarProducto(this.productoSeleccionado, this.observaciones.trim());
      }
    } else if (diferencia < 0) {
      for (let i = 0; i < -diferencia; i++) {
        this.carritoService.eliminarUnidad(this.productoSeleccionado.id!, this.observaciones.trim());
      }
    }

    Swal.fire({
      title: '¡Agregado!',
      text: `${this.productoSeleccionado.nombre} × ${this.cantidad}${this.observaciones ? ' → ' + this.observaciones : ''}`,
      icon: 'success',
      toast: true,
      position: 'bottom-end',
      timer: 2500,
      showConfirmButton: false,
      background: '#8B4513',
      color: 'white'
    });

    this.cerrarModal();
  }
}
