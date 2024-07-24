import { Cliente } from './../../../core/models/cliente.model';
import { EquipoService } from './../../../core/services/equipo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Orden } from './../../../core/models/orden.model';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { CommonModule } from '@angular/common';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Equipo } from '../../../core/models/equipo.model';
import { SpinnerModule } from 'primeng/spinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TrabajadorService } from '../../../core/services/trabajador.service';
import { Trabajador } from '../../../core/models/trabajador.model';
import { DetalleOrden } from '../../../core/models/detalleOrden.model';
import { OrdenService } from '../../../core/services/orden.service';

declare var $: any;
@Component({
  selector: 'app-registrar-orden',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AutoCompleteModule,
    SpinnerModule,
    InputNumberModule
  ],
  templateUrl: './registrar-orden.component.html',
  styleUrl: './registrar-orden.component.css'
})
export class RegistrarOrdenComponent implements OnInit{
  clientes: Cliente[] = [];
  clientesTemp: Cliente[] = [];
  equipos: Equipo[] = [];
  equiposTemp: Equipo[] = [];
  tecnicos: Trabajador[] = [];
  tecnicosTemp: Trabajador[] = [];
  carrito: DetalleOrden[] = [];
  orden: Orden = new Orden();
  equipo: Equipo = new Equipo();
  cantidad: number = 0;

  private searchTermsCliente = new Subject<string>();
  private searchTermsEquipo = new Subject<string>();
  private searchTermsTecnico = new Subject<string>();

  constructor(
    private clienteService: ClienteService,
    private equipoService: EquipoService,
    private trabajadorService: TrabajadorService,
    private ordenService: OrdenService,
    private alerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.fnListarClientes();
    this.fnListarEquipos();
    this.fnListarTecnicos();
    this.setupSearchSubscription();
  }

  fnListarClientes() {
    this.clienteService.ListarOrderRazonSocial().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (e) => {
        this.alerta.error('No se pudieron cargaron clientes.');
      }
    });
  }

  fnListarEquipos() {
    this.equipoService.ListarTodos().subscribe({
      next: (data) => {
        this.equipos = data;
      },
      error: (e) => {
        this.alerta.error('No se pudieron cargaron equipos.');
      }
    });
  }

  fnListarTecnicos() {
    this.trabajadorService.ListarTecnicos().subscribe({
      next: (data) => {

        this.tecnicos = data.map(tecnico => ({
          ...tecnico,
          nombreCompleto: tecnico.nombres + ' ' + tecnico.apellidos
        }));
      },
      error: (e) => {
        this.alerta.error('No se pudieron cargaron tecnicos.');
      }
    });
  }

  fnBuscarClientes(event: AutoCompleteCompleteEvent) {
    const filtro = event.query;
    this.searchTermsCliente.next(filtro);
  }

  fnBuscarEquipos(event: AutoCompleteCompleteEvent) {
    const filtro = event.query;
    this.searchTermsEquipo.next(filtro);
  }

  fnBuscarTecnicos(event: AutoCompleteCompleteEvent) {
    const filtro = event.query;
    this.searchTermsTecnico.next(filtro);
  }

  setupSearchSubscription() {
    this.searchTermsCliente.pipe().subscribe((filtro) => {
      this.clientesTemp = this.clientes.filter((item) =>
        item.razonSocial!.toString().toLowerCase().trim().includes(filtro.toLowerCase())
      );
    });

    this.searchTermsEquipo.pipe().subscribe((filtro) => {
      this.equiposTemp = this.equipos.filter((item) =>
        item.nombre!.toString().toLowerCase().trim().includes(filtro.toLowerCase())
      );
    });

    this.searchTermsTecnico.pipe().subscribe((filtro) => {
      this.tecnicosTemp = this.tecnicos.filter((item) =>
        item.nombreCompleto.toLowerCase().trim().includes(filtro.toLowerCase())
      );
    });
  }

  fnSeleccionarEquipo(event: any) {
    this.equipo = event;
  }

  fnAgregarCarrito() {
    if(!this.equipo || this.equipo.id == 0){
      this.alerta.warning('Debe seleccionar un equipo.');
      return;
    }

    if(this.cantidad <=0){
      this.alerta.warning('Debe ingresar una cantidad valida.');
      return;
    }

    const index = this.carrito.findIndex(item => item.equipo.id === this.equipo.id);

    if (index !== -1) {
      this.carrito[index].cantidad += this.cantidad;
    } else {
      this.carrito.push({ equipo: this.equipo, cantidad: this.cantidad });
    }
    this.equipo = new Equipo();
    this.cantidad = 0;
  }

  fnProcesarOrden(){
    if(!this.orden.cliente || this.orden.cliente.id == 0){
      this.alerta.warning('Debe seleccionar un cliente.');
      return;
    }

    if(!this.orden.trabajador || this.orden.trabajador.id == 0){
      this.alerta.warning('Debe seleccionar un técnico.');
      return;
    }

    this.orden.detalles = this.carrito;

    this.ordenService.GuardarDatos(this.orden).subscribe({
      next: (data: any) =>{
      if(data.msj == 'OK'){
        this.alerta.success('Orden registrado!');
        this.carrito = [];
      }else{
        this.alerta.info(data.msj);
      }
    },error: (e) =>{
      this.alerta.error('Error al registrar orden.');
      console.log(e);
      }
    })


  }

  fnEliminarCarrito(item: DetalleOrden){
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

}
