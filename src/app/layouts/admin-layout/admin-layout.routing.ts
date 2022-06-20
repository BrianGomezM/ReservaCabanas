import { Routes, CanActivate } from '@angular/router';

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
import { CrearAbonoComponent }  from 'app/contable/abonos/crear-abono/crear-abono.component';
import { ListadoAbonosComponent } from 'app/contable/abonos/listado-abonos/listado-abonos.component';
import { UsuariosModule } from 'app/usuarios/usuarios.module';
import { AdminGuard } from '../../guardianes/admin.guard';

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

    //
    
    { path: 'reservas',       component: ListadoReservasComponent,canActivate:[AdminGuard] },
    /*{path: 'usuarios',  
       loadChildren: () => import('../../usuarios/usuarios.module').then(m => m.UsuariosModule)},*/
    { path: 'usuario-listar', component: ListadoUsuariosComponent,canActivate:[AdminGuard] },
    { path: 'usuario-editar/:id',  component: CrearUsuarioComponent,canActivate:[AdminGuard] },
    { path: 'usuario-crear',  component: CrearUsuarioComponent,canActivate:[AdminGuard] },
    //{ path: 'table-list',     component: TableListComponent },
   // { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent,canActivate:[AdminGuard] },
    { path: 'notifications',  component: NotificationsComponent ,canActivate:[AdminGuard] },
    //{ path: 'upgrade',        component: UpgradeComponent },
    { path: 'contable',       component: IngresosComponent,canActivate:[AdminGuard] },
    { path: 'abonos',       component: ListadoAbonosComponent,canActivate:[AdminGuard] },
    { path: 'abonos-crear',  component: CrearAbonoComponent,canActivate:[AdminGuard] },
    { path: 'abonos-crear/:id',  component: CrearAbonoComponent,canActivate:[AdminGuard] },
    { path: 'reserva-abonos-crear/:id',  component: CrearAbonoComponent,canActivate:[AdminGuard] },
    { path: 'cabanas',        component: ListadoCabanasComponent,canActivate:[AdminGuard] },
    { path: 'cabana-crear',   component: CrearCabanaComponent,canActivate:[AdminGuard] },
    { path: 'cabana-editar/:id',  component: EditarCabanaComponent,canActivate:[AdminGuard] },
    { path: 'ayuda',          component: AyudaComponent,canActivate:[AdminGuard] },
    { path: 'planes',         component: ListadoPlanesComponent,canActivate:[AdminGuard] },
];
