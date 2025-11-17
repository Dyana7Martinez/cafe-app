import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { FormsModule } from '@angular/forms'; // Para two-way binding con ngModel
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener el ID y navegar
import { DataService } from '../../services/data.service'; // Ajusta el path si es necesario
import { Producto } from '../../models/producto.model'; // Asegúrate de que este path sea correcto
import Swal from 'sweetalert2'; // Para alertas

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añadido FormsModule para [(ngModel)]
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  producto: Producto | null = null; // Inicializa como null para evitar errores
  id: string | null = null; // ID del producto a actualizar

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router // Añadido para redirección tras actualizar
  ) {}

  ngOnInit(): void {
    // Obtener el ID desde la ruta (e.g., /actualizar/:id)
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.cargarProducto();
    } else {
      Swal.fire('Error', 'ID no proporcionado', 'error');
      this.router.navigate(['/menu']); // Redirige si no hay ID
    }
  }

  cargarProducto(): void {
    if (this.id) {
      this.dataService.getDataById('productos', this.id).subscribe({
        next: (data: Producto | null) => {
          this.producto = data;
          if (!this.producto) {
            Swal.fire('Error', 'Producto no encontrado', 'error');
            this.router.navigate(['/menu']); // Redirige si no se encuentra
          }
        },
        error: (error: any) => {
          console.error('Error al cargar producto:', error);
          Swal.fire('Error', 'No se pudo cargar el producto. Intenta de nuevo.', 'error');
          this.router.navigate(['/menu']); // Redirige en caso de error
        }
      });
    }
  }

  guardarCambios(): void {
    if (this.producto && this.id) {
      this.dataService.updateData('productos', this.id, this.producto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
          this.router.navigate(['/menu']); // Redirige al menú tras éxito
        },
        error: (error: any) => {
          console.error('Error al actualizar producto:', error);
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'No hay datos para actualizar', 'error');
    }
  }
}