// src/app/services/data.services.ts (adaptado para Cafetería BeanFlow)
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../componentes/login/login.service'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  // ========================================
  // GUARDAR TODOS LOS PEDIDOS (sobrescribe la lista)
  // ========================================
  guardar_pedido(pedidos: any[]) {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/pedidos.json?auth=${token}`;

    console.log('Guardando pedidos en:', url);

    this.httpClient.put(url, pedidos).subscribe(
      () => console.log('Se han guardado los pedidos'),
      error => console.log('Error ' + error)
    );
  }

  // ========================================
  // CARGAR TODOS LOS PEDIDOS
  // ========================================
  cargar_pedidos() {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/pedidos.json?auth=${token}`;

    console.log('Cargando pedidos desde:', url);

    return this.httpClient.get(url);
  }

  // ========================================
  // ACTUALIZAR UN PEDIDO
  // ========================================
  actualizar_pedido(indice: string, pedido: any): Promise<any> {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/pedidos/${indice}.json?auth=${token}`;

    console.log('Actualizando pedido en:', url);

    const observable = this.httpClient.put(url, pedido);
    return lastValueFrom(observable);
  }

  // ========================================
  // ELIMINAR UN PEDIDO
  // ========================================
  eliminar_pedido(indice: string) {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/pedidos/${indice}.json?auth=${token}`;

    console.log('Eliminando pedido en:', url);

    this.httpClient.delete(url).subscribe(
      () => console.log('Se ha eliminado el pedido'),
      error => console.log('Error: ' + error)
    );
  }

  // ========================================
  // MÉTODOS EXTRA PARA CAFETERÍA (opcional, para otros nodos como productos)
  // ========================================
  // Ejemplo: Cargar productos
  cargar_productos() {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/productos.json?auth=${token}`;

    console.log('Cargando productos desde:', url);

    return this.httpClient.get(url);
  }

  // Ejemplo: Actualizar producto
  actualizar_producto(indice: string, producto: any): Promise<any> {
    const token = this.loginService.getIdToken();
    const url = `https://cafeteria-app-72612-default-rtdb.firebaseio.com/productos/${indice}.json?auth=${token}`;

    console.log('Actualizando producto en:', url);

    const observable = this.httpClient.put(url, producto);
    return lastValueFrom(observable);
  }
}