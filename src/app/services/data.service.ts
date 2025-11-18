import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = "https://cafeteria-app-72612-default-rtdb.firebaseio.com"

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener elementos como arreglo */
  getDataAsArray(path: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${path}.json`).pipe(
      map(data => {
        if (!data || typeof data !== 'object') { return []; }

        return Object.entries(data).map(([id, value]) => ({
          id,
          ...(typeof value === 'object' && value !== null ? value : {})
        }));
      })
    );
  }

  /** 🔹 Obtener por ID */
  getDataById(path: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${path}/${id}.json`);
  }

  /** 🔹 Crear nuevo registro */
  createData(path: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${path}.json`, data);
  }

  /** 🔹 Actualizar registro */
  updateData(path: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${path}/${id}.json`, data);
  }

  /** 🔹 Eliminar registro */
  deleteData(path: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${path}/${id}.json`);
  }
}
