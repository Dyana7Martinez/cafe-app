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
  
  // ---------- Bebidas Calientes ----------
  { id: '1', nombre: 'Café Espresso', precio: 5, imagen: 'assets/bebidas-calientes/cafe-espresso.jpg', categoria: 'Bebidas calientes', descripcion: 'Intenso y aromático' },
  { id: '2', nombre: 'Capuchino', precio: 7, imagen: 'assets/bebidas-calientes/capuchino.jpg', categoria: 'Bebidas calientes', descripcion: 'Con espuma cremosa' },
  { id: '3', nombre: 'Latte', precio: 6, imagen: 'assets/bebidas-calientes/latte.jpg', categoria: 'Bebidas calientes', descripcion: 'Suave y cremoso' },
  { id: '4', nombre: 'Café Americano', precio: 5, imagen: 'assets/bebidas-calientes/americano.jpg', categoria: 'Bebidas calientes', descripcion: 'Ligero y aromático' },
  { id: '5', nombre: 'Mocha', precio: 7, imagen: 'assets/bebidas-calientes/mocha.jpg', categoria: 'Bebidas calientes', descripcion: 'Chocolate y café juntos' },
  { id: '6', nombre: 'Macchiato', precio: 6, imagen: 'assets/bebidas-calientes/macchiato.jpg', categoria: 'Bebidas calientes', descripcion: 'Espuma intensa' },
  { id: '7', nombre: 'Café Irlandés', precio: 8, imagen: 'assets/bebidas-calientes/irish-coffee.jpg', categoria: 'Bebidas calientes', descripcion: 'Con toque de licor' },
  { id: '8', nombre: 'Chai Latte', precio: 6, imagen: 'assets/bebidas-calientes/chai-latte.jpg', categoria: 'Bebidas calientes', descripcion: 'Especiado y aromático' },
  { id: '9', nombre: 'Café con Leche', precio: 5, imagen: 'assets/bebidas-calientes/cafe-con-leche.jpg', categoria: 'Bebidas calientes', descripcion: 'Clásico y delicioso' },
  { id: '10', nombre: 'Affogato', precio: 7, imagen: 'assets/bebidas-calientes/affogato.jpg', categoria: 'Bebidas calientes', descripcion: 'Café con helado' },

  // ---------- Bebidas Frías ----------
  { id: '11', nombre: 'Té Verde Frío', precio: 4, imagen: 'assets/bebidas-frias/te-verde.jpg', categoria: 'Bebidas Frias', descripcion: 'Refrescante y saludable' },
  { id: '12', nombre: 'Limonada', precio: 3, imagen: 'assets/bebidas-frias/limonada.jpg', categoria: 'Bebidas Frias', descripcion: 'Ácida y fresca' },
  { id: '13', nombre: 'Frappuccino', precio: 6, imagen: 'assets/bebidas-frias/frappuccino.jpg', categoria: 'Bebidas Frias', descripcion: 'Café helado y cremoso' },
  { id: '14', nombre: 'Smoothie de Fresa', precio: 5, imagen: 'assets/bebidas-frias/smoothie-fresa.jpg', categoria: 'Bebidas Frias', descripcion: 'Dulce y saludable' },
  { id: '15', nombre: 'Iced Latte', precio: 6, imagen: 'assets/bebidas-frias/iced-latte.jpg', categoria: 'Bebidas Frias', descripcion: 'Café con hielo' },
  { id: '16', nombre: 'Té Helado', precio: 4, imagen: 'assets/bebidas-frias/te-helado.jpg', categoria: 'Bebidas Frias', descripcion: 'Clásico y refrescante' },
  { id: '17', nombre: 'Agua de Coco', precio: 4, imagen: 'assets/bebidas-frias/agua-coco.jpg', categoria: 'Bebidas Frias', descripcion: 'Natural y fresca' },
  { id: '18', nombre: 'Granizado de Café', precio: 5, imagen: 'assets/bebidas-frias/granizado-cafe.jpg', categoria: 'Bebidas Frias', descripcion: 'Helado y café' },
  { id: '19', nombre: 'Batido de Chocolate', precio: 6, imagen: 'assets/bebidas-frias/batido-chocolate.jpg', categoria: 'Bebidas Frias', descripcion: 'Dulce y cremoso' },
  { id: '20', nombre: 'Mojito Sin Alcohol', precio: 5, imagen: 'assets/bebidas-frias/mojito.jpg', categoria: 'Bebidas Frias', descripcion: 'Refrescante y cítrico' },

  // ---------- Postres ----------
  { id: '21', nombre: 'Croissant', precio: 6, imagen: 'assets/postres/croissant.jpg', categoria: 'Postres', descripcion: 'Mantecoso y crujiente' },
  { id: '22', nombre: 'Tarta de Chocolate', precio: 7, imagen: 'assets/postres/tarta-chocolate.jpg', categoria: 'Postres', descripcion: 'Dulce y cremosa' },
  { id: '23', nombre: 'Cheesecake', precio: 8, imagen: 'assets/postres/cheesecake.jpg', categoria: 'Postres', descripcion: 'Suave y delicioso' },
  { id: '24', nombre: 'Brownie', precio: 5, imagen: 'assets/postres/brownie.jpg', categoria: 'Postres', descripcion: 'Chocolate intenso' },
  { id: '25', nombre: 'Macarons', precio: 6, imagen: 'assets/postres/macarons.jpg', categoria: 'Postres', descripcion: 'Coloridos y suaves' },
  { id: '26', nombre: 'Helado', precio: 5, imagen: 'assets/postres/helado.jpg', categoria: 'Postres', descripcion: 'Frío y delicioso' },
  { id: '27', nombre: 'Galletas', precio: 4, imagen: 'assets/postres/galletas.jpg', categoria: 'Postres', descripcion: 'Crujientes y dulces' },
  { id: '28', nombre: 'Panqueques', precio: 7, imagen: 'assets/postres/panqueques.jpg', categoria: 'Postres', descripcion: 'Con miel y frutas' },
  { id: '29', nombre: 'Tiramisú', precio: 8, imagen: 'assets/postres/tiramisu.jpg', categoria: 'Postres', descripcion: 'Italiano y cremoso' },
  { id: '30', nombre: 'Mousse de Chocolate', precio: 7, imagen: 'assets/postres/mousse.jpg', categoria: 'Postres', descripcion: 'Ligero y delicioso' },

  // ---------- Comidas ----------
  { id: '31', nombre: 'Ensalada César', precio: 12, imagen: 'assets/comidas/ensalada.jpg', categoria: 'Comidas', descripcion: 'Fresca y deliciosa' },
  { id: '32', nombre: 'Sándwich Club', precio: 10, imagen: 'assets/comidas/sandwich.jpg', categoria: 'Comidas', descripcion: 'Clásico y completo' },
  { id: '33', nombre: 'Hamburguesa', precio: 11, imagen: 'assets/comidas/hamburguesa.jpg', categoria: 'Comidas', descripcion: 'Con queso y lechuga' },
  { id: '34', nombre: 'Pizza Margarita', precio: 12, imagen: 'assets/comidas/pizza.jpg', categoria: 'Comidas', descripcion: 'Clásica y deliciosa' },
  { id: '35', nombre: 'Pasta Alfredo', precio: 13, imagen: 'assets/comidas/pasta.jpg', categoria: 'Comidas', descripcion: 'Cremosa y sabrosa' },
  { id: '36', nombre: 'Wrap de Pollo', precio: 11, imagen: 'assets/comidas/wrap.jpg', categoria: 'Comidas', descripcion: 'Ligero y rico' },
  { id: '37', nombre: 'Tacos', precio: 10, imagen: 'assets/comidas/tacos.jpg', categoria: 'Comidas', descripcion: 'Con carne y verduras' },
  { id: '38', nombre: 'Quiche', precio: 12, imagen: 'assets/comidas/quiche.jpg', categoria: 'Comidas', descripcion: 'Sabroso y ligero' },
  { id: '39', nombre: 'Sopa de Verduras', precio: 9, imagen: 'assets/comidas/sopa.jpg', categoria: 'Comidas', descripcion: 'Nutritiva y saludable' },
  { id: '40', nombre: 'Ravioles', precio: 13, imagen: 'assets/comidas/ravioles.jpg', categoria: 'Comidas', descripcion: 'Con salsa y queso' },
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

  // 1. GUARDAR CLIENTE LA PRIMERA VEZ (solo si no existe)
  if (!this.carritoService.getCliente()?.nombre) {
    if (!this.nombreUsuario.trim() || !this.mesa.trim()) {
      Swal.fire('Error', 'Por favor ingresa nombre del cliente y mesa', 'error');
      return;
    }
    this.carritoService.setCliente(this.nombreUsuario.trim(), this.mesa.trim());
  }

  // 2. AGREGAR PRODUCTO CON SUS PROPIAS OBSERVACIONES
  const diferencia = this.cantidad - this.obtenerCantidad(this.productoSeleccionado);

  if (diferencia > 0) {
    // Agregar los que faltan
    for (let i = 0; i < diferencia; i++) {
      this.carritoService.agregarProducto(
        this.productoSeleccionado,
        this.observaciones.trim()  // ← Observaciones por producto
      );
    }
  } else if (diferencia < 0) {
    // Quitar los que sobran (mismo producto, mismas observaciones)
    for (let i = 0; i < -diferencia; i++) {
      this.carritoService.eliminarUnidad(this.productoSeleccionado.id!, this.observaciones.trim());
    }
  }

  // Éxito
  Swal.fire({
    title: 'Listo!',
    text: `${this.cantidad} × ${this.productoSeleccionado.nombre}${this.observaciones ? ' → ' + this.observaciones : ''}`,
    icon: 'success',
    toast: true,
    position: 'bottom-end',
    timer: 3000,
    showConfirmButton: false,
    background: '#5D4037',
    color: 'white'
  });

  this.cerrarModal();
}}