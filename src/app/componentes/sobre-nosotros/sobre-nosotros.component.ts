import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor si usas
import Swal from 'sweetalert2'; // Para alerts si necesitas

import { DataService } from '../../services/data.service'; // Ajusta path

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {
  info: any = []; // Array o objeto para datos de "sobre-nosotros"

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarInfo();
  }

  // ✅ Método para cargar info (subscribe con tipado data: any)
  cargarInfo(): void {
    this.dataService.getData('sobre-nosotros').subscribe(
      (data: any) => { // ✅ Tipado explícito 'data: any' (resuelve TS7006)
        if (data) {
          this.info = data; // Asigna datos a propiedad
          console.log('Info cargada:', data);
        } else {
          this.info = []; // Fallback vacío
        }
      },
      (error: any) => { // ✅ Tipa error también
        console.error('Error cargando info:', error);
        Swal.fire('Error', 'No se pudo cargar la información.', 'error');
        this.info = []; // Fallback en error
      }
    );
  }

  // Ejemplo de método con param tipado (si lo usas)
  mostrarInfo(data: any): void { // ✅ Tipado explícito
    console.log('Mostrando:', data);
  }
}