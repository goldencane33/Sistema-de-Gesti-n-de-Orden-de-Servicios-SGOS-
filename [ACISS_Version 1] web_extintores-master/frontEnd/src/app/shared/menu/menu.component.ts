import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  usuario: any;
  rol: string = '';
  esAdmin: boolean = false;
  constructor(private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.rol = this.authService.getRol();
    this.esAdmin = this.authService.esAdmin();
  }
}
