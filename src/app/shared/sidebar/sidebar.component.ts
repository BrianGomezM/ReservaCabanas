import { Component, OnInit } from '@angular/core';
import { AdminGuard } from '../../guardianes/admin.guard';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    id?: string;
    children? : RouteInfo[];
    
}
export const ROUTES: RouteInfo[] = [
  { path: '/reservas', title: 'Reservas',  icon: 'calendar_month', children: null},
  { path: '#component', id: 'component', title: 'Contable', icon: 'calculate', children: [
    {path:  '/abonos', title: 'Abonos', icon: 'A', children: null}    
  ]},
  { path: '/usuario-listar', title: 'Usuarios',  icon:'person', children: null },
  { path: '/cabanas', title: 'Cabañas',  icon:'cottage', children: null },
  { path: '/ayuda', title: 'Ayuda',  icon:'help_outline' , children: null },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuNuevo: any[]=[];
  constructor(public rol:AdminGuard, private router: Router) { }

  ngOnInit() {
    if(this.rol.usuarios['idRol']==1){//admin  
      this.menuNuevo = ROUTES.filter(menuItem => menuItem);
    }else if(this.rol.usuarios['idRol']==2){//logistica
      this.menuNuevo.push(ROUTES[0]);
      this.menuNuevo.push(ROUTES[1]);       
      this.menuNuevo.push(ROUTES[3]);
      this.menuNuevo.push(ROUTES[4]);
      this.menuNuevo.push(ROUTES[5]);  
    }else if(this.rol.usuarios['idRol']==3){//contable
      this.menuNuevo.push(ROUTES[1]);
    }else if(this.rol.usuarios['idRol']==4){//reservas
      this.menuNuevo.push(ROUTES[0]);       
      this.menuNuevo.push(ROUTES[2]);
      this.menuNuevo.push(ROUTES[3]);
      this.menuNuevo.push(ROUTES[4]);
      this.menuNuevo.push(ROUTES[5]); 
    }else{
      this.router.navigate(['/']);  
    }
    this.menuItems = this.menuNuevo;    
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
