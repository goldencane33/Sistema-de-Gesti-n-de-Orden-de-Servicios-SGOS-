
import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../core/services/alerta.service';
import { ReporteService } from '../../core/services/reporte.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  reporte: any;
  constructor(private reporteService:ReporteService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnObtenerCantidades();
  }

  fnObtenerCantidades(){
    this.reporteService.ObtenerCantidades().subscribe({
      next: (data) =>{
        this.reporte = data;
      },error: (e) =>{
        this.alerta.error('No se pudieron reporte.');
        console.log(e);
      }
    })
  }
}
