export class Menu {
  id?: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  categoria?: string;

  constructor(
    nombre: string,
    precio: number,
    imagen: string,
    descripcion?: string,
    categoria?: string,
    id?: string
  ) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.id = id;
  }

  get precioFormato(): string {
    return "$" + this.precio.toFixed(2);
  }
}
