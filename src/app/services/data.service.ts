import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; // Para retornar Observables en GET
import { lastValueFrom } from "rxjs"; // Para Promises en PUT/DELETE si necesitas async/await
import { catchError } from "rxjs/operators"; // Para manejar errores
import { Producto } from "../producto.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://cafeteria-app-72612-default-rtdb.firebaseio.com'; // Tu URL de Firebase RTDB

  constructor(private httpClient: HttpClient) {}

  // ✅ GET: Cargar datos (retorna Observable para subscribe)
  getData(path: string): Observable<any> {
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        console.error('Error cargando datos:', error);
        throw error;
      })
    );
  }

  // ✅ POST: Crear/guardar datos (método faltante – resuelve TS2339)
  createData(path: string, data: any): Observable<any> { // Retorna Observable para subscribe en carrito.service.ts
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.post(url, data).pipe(
      catchError(error => {
        console.error('Error creando datos:', error);
        throw error;
      })
    );
  }

  // ✅ PUT: Actualizar datos (Promise para async/await)
  updateData(path: string, id: string, data: any): Promise<any> {
    const url = `${this.baseUrl}/${path}/${id}.json`;
    const observable = this.httpClient.put(url, data);
    return lastValueFrom(observable).catch(error => {
      console.error('Error actualizando:', error);
      throw error;
    });
  }

  // ✅ DELETE: Eliminar datos (Observable con subscribe)
  deleteData(path: string, id: string): Observable<any> {
    const url = `${this.baseUrl}/${path}/${id}.json`;
    return this.httpClient.delete(url).pipe(
      catchError(error => {
        console.error('Error eliminando:', error);
        throw error;
      })
    );
  }

  // ✅ Método extra: Obtener dato específico
  getDataById(path: string, id: string): Observable<any> {
    const url = `${this.baseUrl}/${path}/${id}.json`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        console.error('Error obteniendo ID:', error);
        throw error;
      })
    );
  }
}