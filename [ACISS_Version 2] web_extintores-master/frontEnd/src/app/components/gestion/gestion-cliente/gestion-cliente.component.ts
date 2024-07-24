import { AlertaService } from './../../../core/services/alerta.service';
import { FormErrorMessageComponent } from './../../../shared/form-error-message/form-error-message.component';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente } from '../../../core/models/cliente.model';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../modules/pipe.module';

declare var $: any;

@Component({
  selector: 'app-gestion-cliente',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormErrorMessageComponent,
    PipesModule
  ],
  templateUrl: './gestion-cliente.component.html',
  styleUrl: './gestion-cliente.component.css'
})
export class GestionClienteComponent implements OnInit{
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  buscadorItems: string = '';

  constructor(private clienteService:ClienteService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnListarTodos();
  }

  fnListarTodos() {
    this.clienteService.ListarTodos().subscribe({
      next: (data) =>{
        this.clientes = data;
      },error: (e) =>{
        this.alerta.error('No se pudieron cargaron clientes.');
        console.log(e);
      }
    })
  }

  fnNuevo(){
    this.cliente = new Cliente();
    this.cliente.estado = 1;
    $('#modalNuevo').modal('show');
  }

  fnCancelar(myForm: NgForm){
    myForm.reset();
  }

  fnGuardar(myForm: NgForm){
    this.clienteService.GuardarDatos(this.cliente).subscribe({
      next: (data: any) =>{
      if(data.msj == 'OK'){
        if(this.cliente.id == 0){
         this.alerta.success('Cliente registrado!');
        }else{
         this.alerta.success('Cliente actualizado!');
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

  fnCargarDatos(item: Cliente){
    this.cliente =  Object.assign({}, item);
    $('#modalNuevo').modal('show');
  }

  fnConfEliminar(item: Cliente){
    this.cliente =  Object.assign({}, item);
    $('#modalEliminar').modal('show');
  }

  fnEliminar(){
    const id = this.cliente.id;

    this.clienteService.Eliminar(id).subscribe({
      next: (data: any) => {
        if (data.msj == 'OK') {
          $('#modalEliminar').modal('hide');
          this.alerta.success('Cliente eliminado!');
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
