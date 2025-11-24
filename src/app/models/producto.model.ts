export class Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;

  constructor(
    nombre: string,
    precio: number,
    categoria: string,
    imagen: string = '',
    descripcion: string = '',
    id: string = ''
  ) {
    this.id = id || Date.now().toString();
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
}
