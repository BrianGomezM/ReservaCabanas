import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { MatInput } from '@angular/material/input';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';

@NgModule({
  declarations: [
    EditarUsuarioComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule

  ]
})
export class UsuariosModule { }
