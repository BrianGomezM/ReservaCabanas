import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos/ingresos.component';
import { EgresosComponent } from './egresos/egresos.component';



@NgModule({
  declarations: [
    IngresosComponent,
    EgresosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContableModule { }
