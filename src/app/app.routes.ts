
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CarritoComponent } from './componentes/carrito/carrito';
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos';
import { ErrorPersonalizadoComponent } from './componentes/error-personalizado/error-personalizado.component';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
   { path: 'sobre-nostros', component: SobreNosotrosComponent },
    { path: 'contacto', component: ContactoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'actualizar/:id', component: ActualizarComponent },
  { path: '**', component: ErrorPersonalizadoComponent }
];
