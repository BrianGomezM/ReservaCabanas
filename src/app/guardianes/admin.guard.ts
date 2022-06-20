import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../login/usuario.module';

@Injectable({
  providedIn: 'root'
})


export class AdminGuard implements CanActivate {


public usuarios:Array<Usuario> = [];
constructor(){
  this.usuarios = JSON.parse(this.getData());
}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.usuarios['idRol']>0 && this.usuarios['idRol'] <5){       
        return true;
      }else{
        return false;
    } 
  }

  registrarDatos(datos){  
    this.saveData(datos); 
    this.usuarios = datos;
  }  
  
  saveData(datos) {
    const myObjStr = JSON.stringify(datos);  
    sessionStorage.setItem("sesion",myObjStr);
  }

  getData() {
    return sessionStorage.getItem('sesion');
  }

  removeData() {
    sessionStorage.removeItem('location');
  }
}