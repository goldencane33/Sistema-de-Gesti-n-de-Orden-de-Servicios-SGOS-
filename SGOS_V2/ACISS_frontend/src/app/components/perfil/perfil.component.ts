import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../core/models/trabajador.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  usuario: Trabajador = new Trabajador();

  constructor(private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }
}
