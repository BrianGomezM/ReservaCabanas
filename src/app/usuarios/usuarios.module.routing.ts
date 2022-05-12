import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditarUsuarioComponent } from 'app/usuarios/editar-usuario/editar-usuario.component';
import { ListadoUsuariosComponent } from 'app/usuarios/listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from 'app/usuarios/crear-usuario/crear-usuario.component';

export const routes: Routes = [
    { path: '',
      children:
      [
          { path: 'listar', component: ListadoUsuariosComponent },
          { path: 'usuario-editar', component: EditarUsuarioComponent },
          { path: 'usuario-crear',  component: CrearUsuarioComponent },
      ]
    } 
    
    
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class UsuariosModuleRoutes { }