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
    if(this.authService.estaAutentificado()){
      window.location.href = this.urlRedirect;
      return;
    }
    this.usuario.correo = 'admin@gmail.com';
    this.usuario.password = '123456';
  }

  fnLogin(){
    let params = {
      'username': this.usuario.correo,
      'password': this.usuario.password
    }
    this.authService.login(params).subscribe({
      next: (data: any) => {
        if(data != null){
          this.alerta.success('Bienvenido!');

          this.authService.setUsuario(data.usuario);
          this.authService.setToken(data.token);
          this.authService.setExpira(data.expiracion);

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
