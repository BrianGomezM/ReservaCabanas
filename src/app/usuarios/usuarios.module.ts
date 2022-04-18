import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
  ]
})
export class UsuariosModule { }
