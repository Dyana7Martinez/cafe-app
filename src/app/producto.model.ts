export class Producto { // Clase con constructor (como pediste)
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: 'calientes' | 'frias' | 'bebidas' | 'comida';

  constructor(
    id: string,
    nombre: string,
    descripcion: string,
    precio: number,
    imagen: string,
    categoria: 'calientes' | 'frias' | 'bebidas' | 'comida'
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.categoria = categoria;
  }
}