import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { MenuHComponent } from '../menu-h/menu-h.component';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/pedido.model';
// IMPORTS DEL ROUTER DE ANGULAR
import { Router, ActivatedRoute, RouterModule } from '@angular/router'; // <--- AGREGADO

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  // AGREGAR RouterModule a imports
  imports: [CommonModule, FormsModule, MenuHComponent, RouterModule], // <--- MODIFICADO
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewChecked {

  productos: Producto[] = [
    
  // ---------- Bebidas Calientes ----------
  { id: '1', nombre: 'Café Espresso', precio: 5, imagen: 'https://comohacercafe.com/wp-content/uploads/2020/03/espresso.jpeg', categoria: 'Bebidas calientes', descripcion: 'Intenso y aromático' },
  { id: '2', nombre: 'Capuchino', precio: 7, imagen: 'https://www.clarin.com/img/2022/03/01/ceq4FUBv9_2000x1500__1.jpg', categoria: 'Bebidas calientes', descripcion: 'Con espuma cremosa' },
  { id: '3', nombre: 'Latte', precio: 6, imagen: 'https://img.freepik.com/premium-photo/latte-coffee-art-wooden-table_41471-5658.jpg', categoria: 'Bebidas calientes', descripcion: 'Suave y cremoso' },
  { id: '4', nombre: 'Café Americano', precio: 5, imagen: 'https://torange.biz/photo/32/ICO/coffee-cup-beans-32459.jpg', categoria: 'Bebidas calientes', descripcion: 'Ligero y aromático' },
  { id: '5', nombre: 'Mocha', precio: 7, imagen: 'https://img.freepik.com/premium-photo/hot-chocolate-with-whipped-cream-glass-wooden-table_921026-11022.jpg', categoria: 'Bebidas calientes', descripcion: 'Chocolate y café juntos' },
  { id: '6', nombre: 'Macchiato', precio: 6, imagen: 'https://tse3.mm.bing.net/th/id/OIP.RJzJ3ZDecReF7f0PGOBgnQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Bebidas calientes', descripcion: 'Espuma intensa' },
  { id: '7', nombre: 'Café Irlandés', precio: 8, imagen: 'https://gourmetdemexico.com.mx/wp-content/uploads/2023/03/diseno-sin-titulo-2-23-1024x597.jpg', categoria: 'Bebidas calientes', descripcion: 'Con toque de licor' },
  { id: '8', nombre: 'Chai Latte', precio: 6, imagen: 'https://myeverydaytable.com/wp-content/uploads/DirtyChaiLatte-8.jpg', categoria: 'Bebidas calientes', descripcion: 'Especiado y aromático' },
  { id: '9', nombre: 'Café con Leche', precio: 5, imagen: 'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/cafe-con-leche.jpg', categoria: 'Bebidas calientes', descripcion: 'Clásico y delicioso' },
  { id: '10', nombre: 'Affogato', precio: 7, imagen: 'https://www.kimscravings.com/wp-content/uploads/2016/08/Affogato2212-1200x1200.jpg', categoria: 'Bebidas calientes', descripcion: 'Café con helado' },

  // ---------- Bebidas Frías ----------
  { id: '11', nombre: 'Té Verde Frío', precio: 4, imagen: 'https://images.mrcook.app/recipe-image/0190b624-f92d-71fc-9538-8214aab81505?cacheKey=TW9uLCAxNSBKdWwgMjAyNCAxMToyNjozOCBHTVQ=', categoria: 'Bebidas Frias', descripcion: 'Refrescante y saludable' },
  { id: '12', nombre: 'Limonada', precio: 3, imagen: 'https://www.cardamomo.news/__export/1713819807950/sites/debate/img/2024/04/22/limonada.png_557707261.png', categoria: 'Bebidas Frias', descripcion: 'Ácida y fresca' },
  { id: '13', nombre: 'Frappuccino', precio: 6, imagen: 'https://consalyazucar.com/cdn/recipes/frapuccino.jpg', categoria: 'Bebidas Frias', descripcion: 'Café helado y cremoso' },
  { id: '14', nombre: 'Smoothie de Fresa', precio: 5, imagen: 'https://tse2.mm.bing.net/th/id/OIP.d0ojMCSTi6aeerUyHMsl_AHaE7?w=640&h=426&rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Bebidas Frias', descripcion: 'Dulce y saludable' },
  { id: '15', nombre: 'Iced Latte', precio: 6, imagen: 'https://uories.com/wp-content/uploads/2020/03/MiloLatte_www.uories.com_2-400x400.jpg', categoria: 'Bebidas Frias', descripcion: 'Café con hielo' },
  { id: '16', nombre: 'Té Helado', precio: 4, imagen: 'https://www.mendoza.gov.ar/wp-content/uploads/sites/49/2023/05/te-helado.jpg', categoria: 'Bebidas Frias', descripcion: 'Clásico y refrescante' },
  { id: '17', nombre: 'Agua de Coco', precio: 4, imagen: 'https://www.losvinos.com.ar/wp-content/uploads/2020/09/agua-de-coco3-scaled.jpeg', categoria: 'Bebidas Frias', descripcion: 'Natural y fresca' },
  { id: '18', nombre: 'Granizado de Café', precio: 5, imagen: 'https://th.bing.com/th/id/R.2159eecb3a7dc9d084e115a000eaa49a?rik=PmGUEc6fluf5Vw&riu=http%3a%2f%2fcocinillas.obesia.com%2fimages%2f2020%2f02febrero%2fgranizado-cafe.jpg&ehk=tFDh63%2fuRNwL4k5xiFQ8MfTrLP%2f1wD%2bsBwxmHpJrusM%3d&risl=&pid=ImgRaw&r=0', categoria: 'Bebidas Frias', descripcion: 'Helado y café' },
  { id: '19', nombre: 'Batido de Chocolate', precio: 6, imagen: 'https://www.guiadasemana.com.br/contentFiles/image/2019/01/FEA/galeria/58586_w840h525_1547213648shutterstock-403484572.jpg', categoria: 'Bebidas Frias', descripcion: 'Dulce y cremoso' },
  { id: '20', nombre: 'Mojito de fresca Sin Alcohol', precio: 5, imagen: 'https://tse2.mm.bing.net/th/id/OIP.txnZy90RbUw7j3yINw5XYQHaEc?w=1200&h=720&rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Bebidas Frias', descripcion: 'Refrescante y cítrico' },

  // ---------- Postres ----------
  { id: '21', nombre: 'Croissant', precio: 6, imagen: 'https://bing.com/th?id=OSK.113ad40ac4664f2ed296f2173060e9e6', categoria: 'Postres', descripcion: 'Mantecoso y crujiente' },
  { id: '22', nombre: 'Tarta de Chocolate', precio: 7, imagen: 'https://bing.com/th?id=OSK.4d23a1f1a1deab498cd1d50f484abc8c', categoria: 'Postres', descripcion: 'Dulce y cremosa' },
  { id: '23', nombre: 'Cheesecake', precio: 8, imagen: 'https://diyjoy.com/wp-content/uploads/2017/03/White-Chocolate-Raspberry-Cheesecake.jpg', categoria: 'Postres', descripcion: 'Suave y delicioso' },
  { id: '24', nombre: 'Brownie', precio: 5, imagen: 'https://tse4.mm.bing.net/th/id/OIP.bYWb_ZzKAQaFNneEBZe9sgHaEP?rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Postres', descripcion: 'Chocolate intenso' },
  { id: '25', nombre: 'Macarons', precio: 6, imagen: 'https://dustyandmarlina.com/wp-content/uploads/2013/08/laduree_003.jpg', categoria: 'Postres', descripcion: 'Coloridos y suaves' },
  { id: '26', nombre: 'Helado', precio: 5, imagen: 'https://www.bakersjournal.com/wp-content/uploads/2022/06/Gelato-Website.jpg', categoria: 'Postres', descripcion: 'Frío y delicioso' },
  { id: '27', nombre: 'Tres Leche', precio: 4, imagen: 'https://img.freepik.com/premium-photo/tres-leches-cake-soaked-three-types-milk_1177965-59780.jpg', categoria: 'Postres', descripcion: 'Relleno de chocolate' },
  { id: '28', nombre: 'Panqueques', precio: 7, imagen: 'https://tse1.mm.bing.net/th/id/OIP.LKUZY_FOoyoYg51eiR-A4gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Postres', descripcion: 'Con miel y frutas' },
  { id: '29', nombre: 'Tiramisú', precio: 8, imagen: 'https://tse2.mm.bing.net/th/id/OIP.hxXWEl9cQKIFvHJ2PLQLkwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3', categoria: 'Postres', descripcion: 'Italiano y cremoso' },
  { id: '30', nombre: 'Mousse de Chocolate', precio: 7, imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', categoria: 'Postres', descripcion: 'Ligero y delicioso' },

  // ---------- Comidas ----------
  { id: '31', nombre: 'Croissants', precio: 12, imagen: 'https://img.freepik.com/fotos-premium/croissant-jamon-queso-lechuga-tomate-aguacate_517131-28.jpg?w=1380', categoria: 'Comidas', descripcion: 'Rellenos de jamón y queso' },
  { id: '32', nombre: 'Sándwich Club', precio: 10, imagen: 'https://th.bing.com/th/id/R.744c84bea7c61fad933497e23ab2f2da?rik=XUcQvbvPOM7yLQ&riu=http%3a%2f%2fcdn.taste.com.au%2fimages%2frecipes%2fsfi%2f2005%2f07%2f1018.jpg&ehk=45WmqnZucECJnQ4wEgA1lZ43QP1MLSldWj%2fqD%2bs%2fGY0%3d&risl=&pid=ImgRaw&r=0', categoria: 'Comidas', descripcion: 'Pavo, pollo, atún, opciones veganas' },
  { id: '33', nombre: 'Hamburguesa', precio: 11, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', categoria: 'Comidas', descripcion: 'Con queso y lechuga' },
  { id: '36', nombre: 'Wrap de Pollo', precio: 11, imagen: 'https://iheartcooks.com/wp-content/uploads/2024/12/number00004_58940_Chicken_Ranch_Wraps_Amateur_photo_from_Reddit_9dea4c59-6132-481f-bb60-a11f6d1bbc22.webp', categoria: 'Comidas', descripcion: 'Ligero y rico' },
  { id: '37', nombre: 'Tacos', precio: 10, imagen: 'https://img.taste.com.au/R_dRdL7V/taste/2022/09/healthy-tacos-recipe-181113-1.jpg', categoria: 'Comidas', descripcion: 'Con carne y verduras' },
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
    private cdr: ChangeDetectorRef,
    // INYECCIÓN DE ROUTER
    private router: Router, // <--- AGREGADO
    private route: ActivatedRoute // <--- AGREGADO
  ) {}

  ngOnInit(): void {
    this.cargarDatosCliente();

    // 1. SUSCRIBIRSE A LOS CAMBIOS DE PARÁMETROS DE CONSULTA (URL)
    this.route.queryParams.subscribe(params => {
      // Obtener la categoría de la URL, por defecto la primera si no existe
      const categoriaId = params['categoria'] || this.categorias[0].id;

      // 2. VALIDAR Y FILTRAR
      const categoriaValida = this.categorias.some(c => c.id === categoriaId);

      if (categoriaValida) {
        this.categoriaActual = categoriaId;
        this.productosFiltrados = this.productos.filter(p => p.categoria === categoriaId);
      } else {
        // Si la categoría no es válida (URL incorrecta), redirigir a la categoría por defecto
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { categoria: this.categorias[0].id },
          replaceUrl: true // Reemplaza la URL en el historial
        });
      }
    });
  } // <--- MODIFICADO (Implementación del routing)

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
    // 3. ACTUALIZAR LA URL al cambiar la categoría
    if (this.categoriaActual !== id) {
      // Navegar para cambiar el parámetro 'categoria' en la URL
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { categoria: id },
        queryParamsHandling: 'merge'
      });
      // El .subscribe en ngOnInit se encargará de actualizar los productosFiltrados
    }
  } // <--- MODIFICADO (Ahora actualiza la URL)

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