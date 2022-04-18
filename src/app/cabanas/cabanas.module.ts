import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCabanasComponent } from './listado-cabanas/listado-cabanas.component';
import { CrearCabanaComponent } from './crear-cabana/crear-cabana.component';
import { EditarCabanaComponent } from './editar-cabana/editar-cabana.component';



@NgModule({
  declarations: [
    ListadoCabanasComponent,
    CrearCabanaComponent,
    EditarCabanaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CabanasModule { }
