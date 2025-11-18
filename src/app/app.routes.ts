import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CarritoComponent } from './componentes/carrito/carrito.component'; // AQUÍ ESTABA EL ERROR
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { LoginComponent } from './componentes/login/login.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'lista-pedido', component: ListaPedidosComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'actualiza/:id', component: ActualizarComponent },
  { path: '**', redirectTo: '' }
];