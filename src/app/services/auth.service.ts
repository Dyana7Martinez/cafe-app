import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'  // Habilita inyección global
})
export class AuthService {
  constructor() {}

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Login exitoso:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('Registro exitoso:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  getCurrentUser(): any {
    return firebase.auth().currentUser;
  }

  async logout(): Promise<void> {
    await firebase.auth().signOut();
  }
}