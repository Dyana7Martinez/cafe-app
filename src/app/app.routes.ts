import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // ✅ Default home
  { path: 'menu', component: MenuComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '' } // 404 a home
];