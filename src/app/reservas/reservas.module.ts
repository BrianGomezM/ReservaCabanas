import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoReservasComponent } from './listado-reservas/listado-reservas.component';



@NgModule({
  declarations: [
    ListadoReservasComponent
  ],
  exports:[
    ListadoReservasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReservasModule { }
