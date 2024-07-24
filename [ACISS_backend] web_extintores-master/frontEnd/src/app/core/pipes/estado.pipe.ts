import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTexto'
})
export class EstadoTextoPipe implements PipeTransform {
  transform(value: number): string {
    return value === 1 ? 'Activo' : 'Inactivo';
  }
}
