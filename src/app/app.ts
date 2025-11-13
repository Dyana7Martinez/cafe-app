import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'; // ✅ Para routerLink en app.html

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // ✅ Agrega RouterModule (resuelve navegación en navbar)
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}