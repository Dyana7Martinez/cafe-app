// src/app/models/producto.model.ts
export class Producto {
  constructor(
    public id: string, // Asumo que el ID es un string si viene de una DB como Firebase
    public nombre: string,
    public precio: number,
    public imagen: string,
    public categoria: string // ¡Añadimos la categoría!
  ) {}
}