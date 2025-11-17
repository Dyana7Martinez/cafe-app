import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model'; // Cambiado a Producto
import { Database, ref, onValue, push, set, update, remove } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productsRef: any;
  private baseUrl = 'https://cafeteria-app-72612-default-rtdb.firebaseio.com';

  constructor(
    private httpClient: HttpClient,
    private db: Database
  ) {
    this.productsRef = ref(this.db, 'productos');
  }

  getDataAsArray(path: string = 'productos'): Observable<Producto[]> {
    return new Observable<Producto[]>(observer => {
      const pathRef = ref(this.db, path);
      const unsubscribe = onValue(pathRef, (snapshot) => {
        const data = snapshot.val();
        let products: Producto[] = [];
        if (data && typeof data === 'object') {
          products = Object.keys(data).map(key => {
            const itemData = data[key];
            return new Producto(
              key,
              itemData.name || itemData.nombre || '',
              itemData.description || itemData.descripcion || '',
              itemData.price || itemData.precio || 0,
              itemData.imageUrl || itemData.imagen || '',
              itemData.category || itemData.categoria || 'calientes'
            );
          });
        }
        observer.next(products);
      }, (error) => {
        console.error('Error en listener:', error);
        observer.error(error);
      });
      return unsubscribe;
    });
  }

  createData(path: string, data: Partial<Producto>): Observable<{ id: string; data: any }> {
    const pathRef = ref(this.db, path);
    const newRef = push(pathRef);
    const fullData = { ...data };
    return from(set(newRef, fullData)).pipe(
      map(() => ({ id: newRef.key || '', data: fullData })),
      catchError(this.handleError)
    );
  }

  updateData(path: string, id: string, data: Partial<Producto>): Observable<void> {
    if (!id) return throwError(() => new Error('ID requerido'));
    const updateRef = ref(this.db, `${path}/${id}`);
    return from(update(updateRef, data)).pipe(
      catchError(this.handleError)
    );
  }

  deleteData(path: string, id: string): Observable<void> {
    if (!id) return throwError(() => new Error('ID requerido'));
    const deleteRef = ref(this.db, `${path}/${id}`);
    return from(remove(deleteRef)).pipe(
      catchError(this.handleError)
    );
  }

  getDataById(path: string, id: string): Observable<Producto | null> {
    if (!id) return throwError(() => new Error('ID requerido'));
    return new Observable<Producto | null>(observer => {
      const itemRef = ref(this.db, `${path}/${id}`);
      const unsubscribe = onValue(itemRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          observer.next(new Producto(id, data.name || '', data.description || '', data.price || 0, data.imageUrl || '', data.category || ''));
        } else {
          observer.next(null);
        }
      }, (error) => observer.error(error));
      return unsubscribe;
    });
  }

  getDataHttp(path: string): Observable<any> {
    const url = `${this.baseUrl}/${path}.json`;
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en DataService:', error);
    return throwError(() => new Error(`Error Firebase: ${error.message || error}`));
  }
}