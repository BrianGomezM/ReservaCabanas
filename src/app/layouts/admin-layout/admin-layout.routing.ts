import { Routes } from '@angular/router';

import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ListadoReservasComponent } from 'app/reservas/listado-reservas/listado-reservas.component';
import { ListadoCabanasComponent } from 'app/cabanas/pages/listado-cabanas/listado-cabanas.component';
import { AyudaComponent } from 'app/ayuda/ayuda.component';
import { ListadoPlanesComponent } from 'app/planes/listado-planes/listado-planes.component';
import { IngresosComponent } from 'app/contable/ingresos/ingresos.component';
import { EditarUsuarioComponent } from 'app/usuarios/editar-usuario/editar-usuario.component';
import { ListadoUsuariosComponent } from 'app/usuarios/listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from 'app/usuarios/crear-usuario/crear-usuario.component';
import { CrearCabanaComponent } from 'app/cabanas/pages/crear-cabana/crear-cabana.component';
import { EditarCabanaComponent } from 'app/cabanas/pages/editar-cabana/editar-cabana.component';

import { UsuariosModule } from 'app/usuarios/usuarios.module';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'reservas',       component: ListadoReservasComponent},
    { path: 'prereservas',    component: ListadoReservasComponent},
    { path: 'usuario-listar', component: ListadoUsuariosComponent },
    { path: 'usuario-editar/:id',  component: CrearUsuarioComponent },
    { path: 'usuario-crear',  component: CrearUsuarioComponent },
    //{ path: 'table-list',     component: TableListComponent },
   // { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    //{ path: 'upgrade',        component: UpgradeComponent },
    { path: 'contable',       component: IngresosComponent},
    { path: 'cabanas',        component: ListadoCabanasComponent},
    { path: 'cabana-crear',   component: CrearCabanaComponent },
    { path: 'cabana-editar/:id',  component: EditarCabanaComponent},
    { path: 'ayuda',          component: AyudaComponent},
    { path: 'planes',         component: ListadoPlanesComponent},
];
