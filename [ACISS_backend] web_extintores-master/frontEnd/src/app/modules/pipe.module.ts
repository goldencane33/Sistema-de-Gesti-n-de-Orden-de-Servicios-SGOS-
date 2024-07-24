import { EstadoTextoPipe } from './../core/pipes/estado.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    EstadoTextoPipe
  ],
  exports: [
    EstadoTextoPipe
  ]
})
export class PipesModule { }
