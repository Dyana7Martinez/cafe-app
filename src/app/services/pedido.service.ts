import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; // Para retornar Observables en GET
import { lastValueFrom } from "rxjs"; // Para Promises en PUT si necesitas async/await
import { catchError } from "rxjs/operators"; // Para manejar errores
import { PedidoCarrito } from "../pedido-carrito.model"; // ✅ Cambiado a Pedido (crea si no lo tienes; usa any si prefieres)

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'https://cafeteria-app-72612-default-rtdb.firebaseio.com'; // Tu URL de Firebase RTDB

  constructor(private httpClient: HttpClient) {}

  // ✅ GET: Cargar pedidos (retorna Observable para subscribe)
  getData(path: string = 'pedidos'): Observable<PedidoCarrito[]> { // ✅ Tipado con Pedido[]
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.get<PedidoCarrito[]>(url).pipe(
      catchError(error => {
        console.error('Error cargando pedidos:', error);
        throw error;
      })
    );
  }

  // ✅ POST: Crear/guardar pedido (retorna Observable para subscribe)
  createData(path: string = 'pedidos', data: PedidoCarrito): Observable<any> { // ✅ Tipado data: Pedido
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        console.error('Error creando pedido:', error);
        throw error;
      })
    );
  }

  // ✅ PUT: Actualizar pedido (Promise para async/await)
  updateData(path: string = 'pedidos', id: string, data: PedidoCarrito): Promise<any> { // ✅ Tipado data: Pedido
    const url = `${this.baseUrl}/${path}/${id}.json`;
    const observable = this.httpClient.put(url, data);
    return lastValueFrom(observable).catch(error => {
      console.error('Error actualizando pedido:', error);
      throw error;
    });
  }

  // ✅ DELETE: Eliminar pedido (retorna Observable para subscribe)
  deleteData(path: string = 'pedidos', id: string): Observable<any> { // ✅ Retorna Observable (consistencia)
    const url = `${this.baseUrl}/${path}/${id}.json`;
    return this.httpClient.delete(url).pipe(
      catchError(error => {
        console.error('Error eliminando pedido:', error);
        throw error;
      })
    );
  }

  // ✅ Método extra: Obtener pedido específico
  getDataById(path: string = 'pedidos', id: string): Observable<PedidoCarrito> { // ✅ Tipado
    const url = `${this.baseUrl}/${path}/${id}.json`;
    return this.httpClient.get<PedidoCarrito>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo ID:', error);
        throw error;
      })
    );
  }
}