import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://cafeteria-app-72612-default-rtdb.firebaseio.com";
  constructor(private http: HttpClient) {}

  getDataAsArray(path: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${path}.json`).pipe(
      map(data => {
        if (!data || typeof data !== 'object') return [];
        return Object.entries(data).map(([id, value]) => ({
          id,
          ...(typeof value === 'object' && value !== null ? value : {})
        }));
      })
    );
  }

  getDataById(path: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${path}/${id}.json`);
  }

  createData(path: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${path}.json`, data);
  }

  updateData(path: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${path}/${id}.json`, data);
  }

  deleteData(path: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${path}/${id}.json`);
  }
}
