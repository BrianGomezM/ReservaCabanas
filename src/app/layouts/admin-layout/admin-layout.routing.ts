import { Routes, CanActivate } from '@angular/router';

import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ListadoReservasComponent } from 'app/reservas/pages/listado-reservas/listado-reservas.component';
import { ListadoCabanasComponent } from 'app/cabanas/pages/listado-cabanas/listado-cabanas.component';
import { AyudaComponent } from 'app/ayuda/ayuda.component';
//import { ListadoPlanesComponent } from 'app/planes/listado-planes/listado-planes.component';
import { IngresosComponent } from 'app/contable/ingresos/ingresos.component';
import { EditarUsuarioComponent } from 'app/usuarios/editar-usuario/editar-usuario.component';
import { ListadoUsuariosComponent } from 'app/usuarios/listado-usuarios/listado-usuarios.component';
import { CrearUsuarioComponent } from 'app/usuarios/crear-usuario/crear-usuario.component';
import { CrearCabanaComponent } from 'app/cabanas/pages/crear-cabana/crear-cabana.component';
import { EditarCabanaComponent } from 'app/cabanas/pages/editar-cabana/editar-cabana.component';
import { UsuariosModule } from 'app/usuarios/usuarios.module';
import { EditarReservaComponent } from 'app/reservas/pages/editar-reserva/editar-reserva.component';
import { CrearPrereservaComponent } from 'app/reservas/pages/crear-prereserva/crear-prereserva.component';
import { HomeComponent } from 'app/home/home/home.component';
import { EditarPrereservaComponent } from 'app/reservas/pages/editar-prereserva/editar-prereserva.component';
import { AdminGuard } from 'app/guardianes/admin.guard';
import { ListadoAbonosComponent } from 'app/contable/abonos/listado-abonos/listado-abonos.component';
import { CrearAbonoComponent } from 'app/contable/abonos/crear-abono/crear-abono.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'reservas',       component: ListadoReservasComponent,canActivate:[AdminGuard]},
    { path: 'editar-reserva/:id', component: EditarReservaComponent,canActivate:[AdminGuard]},
    { path: 'prereservas',    component: ListadoReservasComponent,canActivate:[AdminGuard]},
    { path: 'editar-prereserva/:id',    component: EditarPrereservaComponent,canActivate:[AdminGuard]},
    { path: 'crear-prereserva',    component: CrearPrereservaComponent,canActivate:[AdminGuard]},
    { path: 'usuario-listar', component: ListadoUsuariosComponent,canActivate:[AdminGuard] },
    { path: 'usuario-editar/:id',  component: CrearUsuarioComponent,canActivate:[AdminGuard] },
    { path: 'usuario-crear',  component: CrearUsuarioComponent },
    { path: 'home',  component: HomeComponent,canActivate:[AdminGuard]},
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
    //{ path: 'planes',         component: ListadoPlanesComponent,canActivate:[AdminGuard] },
];
