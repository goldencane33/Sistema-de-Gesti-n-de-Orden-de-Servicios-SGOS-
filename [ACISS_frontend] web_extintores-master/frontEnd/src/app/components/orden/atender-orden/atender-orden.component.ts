import { AuthService } from './../../../core/services/auth.service';
import { ReporteService } from './../../../core/services/reporte.service';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../../core/services/alerta.service';
import { OrdenService } from '../../../core/services/orden.service';
import { Orden } from '../../../core/models/orden.model';
import { TableModule } from 'primeng/table';
import { PipesModule } from '../../../modules/pipe.module';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Trabajador } from '../../../core/models/trabajador.model';
declare var $: any;
@Component({
  selector: 'app-atender-orden',
  standalone: true,
  imports: [
    TableModule,
    PipesModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './atender-orden.component.html',
  styleUrl: './atender-orden.component.css'
})
export class AtenderOrdenComponent implements OnInit{
  ordenes: Orden[] = [];
  orden: Orden = new Orden();
  trabajador: Trabajador = new Trabajador();
  urlBase: string = environment.baseUrl;
  constructor(
    private ordenService: OrdenService,
    private authService: AuthService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.trabajador = this.authService.getUsuario();
    this.fnListarOrdenes();
  }

  fnListarOrdenes() {
    let id = this.authService.esAdmin()? 0: this.trabajador.id;
    this.ordenService.ListarPendientes(id).subscribe({
      next: (data) => {
        this.ordenes = data;
      },
      error: (e) => {
        this.alerta.error('No se pudieron cargaron ordenes.');
      }
    });
  }

  fnVerDetalle(item: Orden){
    this.orden = item;
    $('#modalDetalle').modal('show');
  }

  fnAtender(){
    this.ordenService.AtenderOrden(this.orden.id).subscribe({
      next: (data) => {
        if(data.msj == 'OK'){
          this.alerta.success('Orden atendida correctamente.');
          $('#modalDetalle').modal('hide');
          this.fnListarOrdenes();
        }else{
          this.alerta.error(data.msj);
        }

      },
      error: (e) => {
        this.alerta.error('No se pudo atender orden.');
      }
    });
  }
}
