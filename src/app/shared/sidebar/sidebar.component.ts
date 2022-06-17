import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon:'content_paste', class: '' },
    { path: '/reservas', title: 'Reservas',  icon: 'calendar_month', class: '' },
    //{ path: '/prereservas', title: 'Prereservas',  icon: 'calendar_month', class: '' },
    { path: '/contable', title: 'Contable',  icon:'library_books', class: '' },
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/usuario-listar', title: 'Usuarios',  icon:'person', class: '' },
    { path: '/cabanas', title: 'Cabañas',  icon:'cottage', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/planes', title: 'Planes',  icon:'wysiwyg', class: '' },
    { path: '/ayuda', title: 'Ayuda',  icon:'help_outline', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },  
    

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
