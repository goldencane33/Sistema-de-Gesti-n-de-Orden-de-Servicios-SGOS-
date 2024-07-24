import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  usuario: any;
  urlRedirect: string = '/login';

  constructor(private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  fnLogout(){
    this.authService.removerLogin();
    window.location.href = this.urlRedirect;
  }
}
