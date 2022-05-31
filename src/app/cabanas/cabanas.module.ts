import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCabanasComponent } from './pages/listado-cabanas/listado-cabanas.component';
import { CrearCabanaComponent } from './pages/crear-cabana/crear-cabana.component';
import { EditarCabanaComponent } from './pages/editar-cabana/editar-cabana.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';





@NgModule({
  declarations: [
    ListadoCabanasComponent,
    CrearCabanaComponent,
    EditarCabanaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    
  ]
})
export class CabanasModule { }
