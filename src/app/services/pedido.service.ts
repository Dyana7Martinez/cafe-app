import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PedidoCarrito } from '../models/pedido-carrito.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'https://cafeteria-app-72612-default-rtdb.firebaseio.com';

  constructor(private httpClient: HttpClient) {}

  getData(path: string = 'pedidos'): Observable<PedidoCarrito[]> {
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.get<PedidoCarrito[]>(url).pipe(
      catchError(error => {
        console.error('Error cargando pedidos:', error);
        throw error;
      })
    );
  }

  createData(path: string = 'pedidos', data: PedidoCarrito): Observable<any> {
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        console.error('Error creando pedido:', error);
        throw error;
      })
    );
  }

  updateData(path: string = 'pedidos', id: string, data: PedidoCarrito): Promise<any> {
    const url = `${this.baseUrl}/${path}/${id}.json`;
    const observable = this.httpClient.put(url, data);
    return lastValueFrom(observable).catch(error => {
      console.error('Error actualizando pedido:', error);
      throw error;
    });
  }

  deleteData(path: string = 'pedidos', id: string): Observable<any> {
    const url = `${this.baseUrl}/${path}/${id}.json`;
    return this.httpClient.delete(url).pipe(
      catchError(error => {
        console.error('Error eliminando pedido:', error);
        throw error;
      })
    );
  }
}