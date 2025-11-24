import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private dbRef = firebase.database().ref('pedidos');

  constructor() {}

  crearPedido(pedido: Pedido): Observable<void> {
    return new Observable(observer => {
      const newRef = this.dbRef.push();
      newRef.set(pedido)
        .then(() => { observer.next(); observer.complete(); })
        .catch(err => observer.error(err));
    });
  }

  obtenerPedidos(): Observable<any> {
    return new Observable(observer => {
      this.dbRef.on('value', snapshot => {
        observer.next(snapshot.val());
      }, err => observer.error(err));
    });
  }

  actualizarPedido(key: string, pedido: Pedido): Observable<void> {
    return new Observable(observer => {
      this.dbRef.child(key).set(pedido)
        .then(() => { observer.next(); observer.complete(); })
        .catch(err => observer.error(err));
    });
  }

  eliminarPedido(key: string): Observable<void> {
    return new Observable(observer => {
      this.dbRef.child(key).remove()
        .then(() => { observer.next(); observer.complete(); })
        .catch(err => observer.error(err));
    });
  }
}
