import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from '../../../core/services/trabajador.service';
import { Trabajador } from '../../../core/models/trabajador.model';
import { AlertaService } from '../../../core/services/alerta.service';
import { FormErrorMessageComponent } from './../../../shared/form-error-message/form-error-message.component';
import { TableModule } from 'primeng/table';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CargoService } from '../../../core/services/cargo.service';
import { Cargo } from '../../../core/models/cargo.model';
import { PipesModule } from '../../../modules/pipe.module';

declare var $: any;

@Component({
  selector: 'app-gestion-trabajador',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormErrorMessageComponent,
    PipesModule
  ],
  templateUrl: './gestion-trabajador.component.html',
  styleUrl: './gestion-trabajador.component.css'
})
export class GestionTrabajadorComponent implements OnInit{
  trabajadores: Trabajador[] = [];
  cargos: Cargo[] = [];
  trabajador: Trabajador = new Trabajador();
  buscadorItems: string = '';

  constructor(private trabajadorService:TrabajadorService,
    private cargoService: CargoService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnListarCargos();
    this.fnListarTodos();
  }

  fnListarCargos() {
    this.cargoService.ListarTodos().subscribe({
      next: (data) =>{
        this.cargos = data;
      },error: (e) =>{
        this.alerta.error('No se pudieron cargaron cargos.');
        console.log(e);
      }
    })
  }

  fnListarTodos() {
    this.trabajadorService.ListarTodos().subscribe({
      next: (data) =>{
        this.trabajadores = data;
        console.dir(data);
      },error: (e) =>{
        this.alerta.error('No se pudieron cargaron trabajadores.');
        console.log(e);
      }
    })
  }

  fnNuevo(){
    this.trabajador = new Trabajador();
    this.trabajador.estado = 1;
    $('#modalNuevo').modal('show');
  }

  fnCancelar(myForm: NgForm){
    myForm.reset();
  }

  fnGuardar(myForm: NgForm){
    this.trabajadorService.GuardarDatos(this.trabajador).subscribe({
      next: (data: any) =>{
      if(data.msj == 'OK'){
        if(this.trabajador.id == 0){
         this.alerta.success('Trabajador registrado!');
        }else{
         this.alerta.success('Trabajador actualizado!');
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

  fnCargarDatos(item: Trabajador){
    this.trabajador =  Object.assign({}, item);
    $('#modalNuevo').modal('show');
  }

  fnConfEliminar(item: Trabajador){
    this.trabajador =  Object.assign({}, item);
    $('#modalEliminar').modal('show');
  }

  fnEliminar(){
    const id = this.trabajador.id;

    this.trabajadorService.Eliminar(id).subscribe({
      next: (data: any) => {
        if (data.msj == 'OK') {
          $('#modalEliminar').modal('hide');
          this.alerta.success('Trabajador eliminado!');
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
