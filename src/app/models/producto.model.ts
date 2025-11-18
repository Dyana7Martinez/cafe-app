export class Producto {
  constructor(
    public id: string,
    public nombre: string,
    public precio: number,
    public imagen: string,
    public descripcion: string,
    public categoria: string
  ) {}
}
