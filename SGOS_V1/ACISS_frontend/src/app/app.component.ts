import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AuthService } from './core/services/auth.service';
import { AlertaService } from './core/services/alerta.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  usuario: any;

  constructor(private authService:AuthService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }



}
