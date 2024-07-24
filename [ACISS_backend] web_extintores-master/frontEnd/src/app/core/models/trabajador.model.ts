import { Cargo } from "./cargo.model";

export class Trabajador {
  id: number = 0;
  nombres: string = '';
  apellidos: string = '';
  dni: string = '';
  correo: string = '';
  password: string = '';
  estado: number = 0;
  cargo: Cargo = new Cargo()
}
