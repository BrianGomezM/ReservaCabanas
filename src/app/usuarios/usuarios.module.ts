import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { MatInput } from '@angular/material/input';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarUsuarioComponent,
    ListadoUsuariosComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule

  ]
})
export class UsuariosModule { }
