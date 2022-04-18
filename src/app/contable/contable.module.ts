import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgresosComponent } from './egresos/egresos.component';



@NgModule({
  declarations: [
    EgresosComponent
  ],
  exports:[
  ],
  imports: [
    CommonModule
  ]
})
export class ContableModule { }
