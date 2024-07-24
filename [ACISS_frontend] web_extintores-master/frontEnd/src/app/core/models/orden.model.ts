import { Cliente } from "./cliente.model";
import { DetalleOrden } from "./detalleOrden.model";
import { Trabajador } from "./trabajador.model";

export class Orden {
  id: number = 0;
  cliente: Cliente = new Cliente();
  trabajador: Trabajador = new Trabajador();
  detalles: DetalleOrden[] = [];
  fecha: Date = new Date();
  estado: number = 0;
}
