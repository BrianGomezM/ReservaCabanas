import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPlanesComponent } from './listado-planes/listado-planes.component';
import { CrearPlanComponent } from './crear-plan/crear-plan.component';



@NgModule({
  declarations: [
    ListadoPlanesComponent,
    CrearPlanComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlanesModule { }
