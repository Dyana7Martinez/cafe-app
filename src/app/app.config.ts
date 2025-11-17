import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Necesario para PedidoService y DataService
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes'; // Importa las rutas definidas



export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Provee el sistema de enrutamiento de Angular
    provideRouter(routes),
    
    // 2. Provee el cliente HTTP para hacer peticiones (a Firebase RTDB, por ejemplo)
    provideHttpClient(),

    // 3. Configuración de Firebase (Opcional, si usas la versión moderna de AngularFire)
    // importProvidersFrom(
    //   provideFirebaseApp(() => initializeApp(environment.firebase)),
    //   provideFirestore(() => getFirestore()),
    // ),
    
    // Aquí puedes agregar más servicios que necesiten ser singleton.
  ]
};