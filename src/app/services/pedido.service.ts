// src/app/services/pedido.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = "https://cafeteria-app-72612-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { }

  // GET: Obtener todos los pedidos (convierte el objeto de Firebase a array)
  getAll(): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.baseUrl}/pedidos.json`)
      .pipe(
        map(data => {
          if (!data) return [];
          return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
        }),
        catchError(err => {
          console.error('Error cargando pedidos:', err);
          throw err;
        })
      );
  }

  // POST: Crear nuevo pedido
  create(pedido: any): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.baseUrl}/pedidos.json`, pedido)
        .pipe(
          map(res => {
            console.log('Pedido creado:', res);
            return res;
          }),
          catchError(err => {
            console.error('Error creando pedido:', err);
            throw err;
          })
        )
    );
  }

  // PUT: Actualizar pedido (estado: pendiente → preparando → listo)
  update(id: string, data: any): Promise<any> {
    return lastValueFrom(
      this.http.put(`${this.baseUrl}/pedidos/${id}.json`, data)
        .pipe(catchError(err => {
          console.error('Error actualizando:', err);
          throw err;
        }))
    );
  }

  // DELETE: Eliminar pedido
  delete(id: string): Promise<any> {
    return lastValueFrom(
      this.http.delete(`${this.baseUrl}/pedidos/${id}.json`)
        .pipe(catchError(err => {
          console.error('Error eliminando:', err);
          throw err;
        }))
    );
  }
}