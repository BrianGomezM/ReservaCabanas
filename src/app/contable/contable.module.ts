import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos/ingresos.component';
import { EgresosComponent } from './egresos/egresos.component';
import { ListadoAbonosComponent } from './abonos/listado-abonos/listado-abonos.component';
import { CrearAbonoComponent } from './abonos/crear-abono/crear-abono.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngresosComponent,
    EgresosComponent,
    ListadoAbonosComponent,
    CrearAbonoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ContableModule { }
