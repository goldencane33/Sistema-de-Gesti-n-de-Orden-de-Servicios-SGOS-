import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  usuario: any;
  constructor(private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }
}
