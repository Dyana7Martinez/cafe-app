import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import  { ContactoComponent} from './componentes/contacto/contacto.component';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { ErrorPersonalizadoComponent } from './componentes/error-personalizado/error-personalizado.component';
import { LoginComponent } from './componentes/login/login.component';
import { LoginGuardian } from './componentes/login/login-guardian';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
   { path: 'lista-pedidos', component: ListaPedidosComponent,canActivate: [LoginGuardian] },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent},
  { path: 'actualizar/:id', component: ActualizarComponent },
  {path: "**", component: ErrorPersonalizadoComponent}
];
