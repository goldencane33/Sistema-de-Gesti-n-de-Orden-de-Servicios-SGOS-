import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { Trabajador } from '../../../core/models/trabajador.model';
import { FormErrorMessageComponent } from '../../../shared/form-error-message/form-error-message.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule
    , FormErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  usuario: Trabajador = new Trabajador();
  urlRedirect: string = '/home';

  constructor(private authService:AuthService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('usuario');
  }

  fnLogin(){
    this.authService.login(this.usuario).subscribe({
      next: (data: any) => {

        if(data != null){
          this.alerta.success('Bienvenido!');
          this.authService.setUsuario(data);
          window.location.href = this.urlRedirect;
        }else{
          this.alerta.error('Usuario y/o contraseña incorrecto.');
        }
      }, error: (e) => {
        this.alerta.error('Usuario y/o contraseña incorrecto.');
        console.log(e);
      }
    })
  }
}
