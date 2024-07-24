import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { GestionClienteComponent } from './components/gestion/gestion-cliente/gestion-cliente.component';
import { GestionTrabajadorComponent } from './components/gestion/gestion-trabajador/gestion-trabajador.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'gestion',
    children: [
      { path: 'cliente', component: GestionClienteComponent },
      { path: 'trabajador', component: GestionTrabajadorComponent }
    ]
  },
  { path: 'home', component: HomeComponent} ,
  { path: 'login', component: LoginComponent} ,
  { path: '', component: LoginComponent} ,
  { path: '**', pathMatch: 'full', redirectTo: 'gestion/cliente' }
];
