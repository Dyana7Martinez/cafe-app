import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/compat/app';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
import { LoginService } from './componentes/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  ngOnInit(): void {
    firebase.initializeApp({
     apiKey: "AIzaSyCvUynQ4rK4xTKC8yvF0mFRvzVFXcAYBX4",
  authDomain: "cafeteria-app-72612.firebaseapp.com",
  databaseURL: "https://cafeteria-app-72612-default-rtdb.firebaseio.com",

    })
  };

  constructor(private loginService: LoginService){}

  estaLogueado(){
    return this.loginService.estaLogueado();
  }

  logout(){
    this.loginService.logout();
  }
  
}
