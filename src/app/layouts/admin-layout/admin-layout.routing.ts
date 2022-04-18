import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListadoReservasComponent } from 'app/reservas/listado-reservas/listado-reservas.component';
import { EgresosComponent } from 'app/contable/egresos/egresos.component';
import { ListadoCabanasComponent } from 'app/cabanas/listado-cabanas/listado-cabanas.component';
import { AyudaComponent } from 'app/ayuda/ayuda.component';
import { ListadoPlanesComponent } from 'app/planes/listado-planes/listado-planes.component';
import { EditarUsuarioComponent } from 'app/usuarios/editar-usuario/editar-usuario.component';

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
    { path: 'reservas',       component: UserProfileComponent },
    { path: 'usuario-editar', component: EditarUsuarioComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'contable',       component: EgresosComponent},
    { path: 'cabanas',        component: ListadoCabanasComponent},
    { path: 'ayuda',          component: AyudaComponent},
    { path: 'planes',         component: ListadoPlanesComponent},
];
