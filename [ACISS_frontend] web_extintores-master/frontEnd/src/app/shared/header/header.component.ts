import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
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
