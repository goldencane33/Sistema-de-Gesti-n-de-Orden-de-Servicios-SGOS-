import { ReporteService } from './../../../core/services/reporte.service';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../../core/services/alerta.service';
import { OrdenService } from '../../../core/services/orden.service';
import { Orden } from '../../../core/models/orden.model';
import { TableModule } from 'primeng/table';
import { PipesModule } from '../../../modules/pipe.module';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-historial-orden',
  standalone: true,
  imports: [
    TableModule,
    PipesModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './historial-orden.component.html',
  styleUrl: './historial-orden.component.css'
})
export class HistorialOrdenComponent implements OnInit{
  ordenes: Orden[] = [];
  orden: Orden = new Orden();
  urlBase: string = environment.baseUrl;
  constructor(
    private ordenService: OrdenService,
    private reporteServide: ReporteService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnListarOrdenes();
  }

  fnListarOrdenes() {
    this.ordenService.ListarTodos().subscribe({
      next: (data) => {
        this.ordenes = data;
        console.dir(this.ordenes);
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

  fnGenerarPDF(){
    let idOrden = this.orden.id;
    this.reporteServide.DescargarPDFOrden(this.orden.id).subscribe((response: any) => {
      const blob = new Blob([response.body], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `Reporte_${idOrden}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    }, error => {
      this.alerta.error('Error al descargar el archivo PDF');
      console.error('error PDF:', error);
    });
  }
}
