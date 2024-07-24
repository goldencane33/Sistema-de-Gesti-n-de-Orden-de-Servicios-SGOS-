import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../../core/models/equipo.model';
import { EquipoService } from '../../../core/services/equipo.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { FormErrorMessageComponent } from './../../../shared/form-error-message/form-error-message.component';
import { TableModule } from 'primeng/table';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../modules/pipe.module';

declare var $: any;
@Component({
  selector: 'app-gestion-equipo',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormErrorMessageComponent,
    PipesModule
  ],
  templateUrl: './gestion-equipo.component.html',
  styleUrl: './gestion-equipo.component.css'
})
export class GestionEquipoComponent implements OnInit{
  equipos: Equipo[] = [];
  equipo: Equipo = new Equipo();
  buscadorItems: string = '';

  constructor(private equipoService: EquipoService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnListarTodos();
  }

  fnListarTodos() {
    this.equipoService.ListarTodos().subscribe({
      next: (data) =>{
        this.equipos = data;
      },error: (e) =>{
        this.alerta.error('No se pudieron cargaron equipos.');
        console.log(e);
      }
    })
  }

  fnNuevo(){
    this.equipo = new Equipo();
    this.equipo.estado = 1;
    $('#modalNuevo').modal('show');
  }

  fnCancelar(myForm: NgForm){
    myForm.reset();
  }

  fnGuardar(myForm: NgForm){
    this.equipoService.GuardarDatos(this.equipo).subscribe({
      next: (data: any) =>{
      if(data.msj == 'OK'){
        if(this.equipo.id == 0){
         this.alerta.success('Equipo registrado!');
        }else{
         this.alerta.success('Equipo actualizado!');
        }
        $('#modalNuevo').modal('hide');
        this.fnListarTodos();
        this.fnCancelar(myForm);
      }else{
        this.alerta.info(data.msj);
      }
    },error: (e) =>{
      this.alerta.error('Error al momento de guardar datos.');
      console.log(e);
      }
    })
  }

  fnCargarDatos(item: Equipo){
    this.equipo =  Object.assign({}, item);
    $('#modalNuevo').modal('show');
  }

  fnConfEliminar(item: Equipo){
    this.equipo =  Object.assign({}, item);
    $('#modalEliminar').modal('show');
  }

  fnEliminar(){
    const id = this.equipo.id;

    this.equipoService.Eliminar(id).subscribe({
      next: (data: any) => {
        if (data.msj == 'OK') {
          $('#modalEliminar').modal('hide');
          this.alerta.success('Equipo eliminado!');
          this.fnListarTodos();
        } else {
          this.alerta.info(data.msj);
        }
      }, error: (e) => {
        this.alerta.error('Ha ocurrido un error al momento de eliminar datos.');
        console.log(e);
      }
    })
  }
}
