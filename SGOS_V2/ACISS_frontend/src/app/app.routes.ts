import { RegistrarOrdenComponent } from './components/orden/registrar-orden/registrar-orden.component';
import { GestionEquipoComponent } from './components/gestion/gestion-equipo/gestion-equipo.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { GestionClienteComponent } from './components/gestion/gestion-cliente/gestion-cliente.component';
import { GestionTrabajadorComponent } from './components/gestion/gestion-trabajador/gestion-trabajador.component';
import { HomeComponent } from './components/home/home.component';
import { AdminGuard } from './core/guards/admin.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistorialOrdenComponent } from './components/orden/historial-orden/historial-orden.component';
import { AtenderOrdenComponent } from './components/orden/atender-orden/atender-orden.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'gestion',
    children: [
      { path: 'cliente', component: GestionClienteComponent },
      { path: 'trabajador', component: GestionTrabajadorComponent },
      { path: 'equipo', component: GestionEquipoComponent },
    ]
    , canActivate:[AdminGuard]
  },
  {
    path: 'orden',
    children: [
      { path: 'registrar', component: RegistrarOrdenComponent, canActivate:[AdminGuard] },
      { path: 'atender', component: AtenderOrdenComponent, canActivate:[AuthGuard] },
      { path: 'historial', component: HistorialOrdenComponent, canActivate:[AuthGuard] },
    ]

  },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] } ,
  { path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard] } ,
  { path: 'login', component: LoginComponent} ,
  { path: '', component: LoginComponent} ,
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
