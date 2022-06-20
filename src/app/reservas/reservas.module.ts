import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoReservasComponent } from './pages/listado-reservas/listado-reservas.component';
import { EditarReservaComponent } from './pages/editar-reserva/editar-reserva.component';
import { FormsModule } from '@angular/forms';
import { CrearPrereservaComponent } from './pages/crear-prereserva/crear-prereserva.component';



@NgModule({
  declarations: [
    ListadoReservasComponent,
    EditarReservaComponent,
    CrearPrereservaComponent
  ],
  exports:[
    ListadoReservasComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ReservasModule { }
