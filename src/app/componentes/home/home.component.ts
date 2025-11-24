// home.component.ts
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';  // ← Importa así
import { CommonModule } from '@angular/common';           // ← Importa así

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // ← Aquí sí van
    RouterLink
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // tu código
}