import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Usuario} from '../usuarios/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})


export class AdminGuard implements CanActivate {

  usuarioEdita:Usuario = {
    idUsuario: 1,
    nombre: "",
    apellido: "",
    idRol: 1,
    tipoDocumento: 0,
    documento: "",
    telefono: "",
    correo: "",
    contrasena: "",
    fechaRegistro: ""
  };
public usuarios:Array<Usuario> = [
  this.usuarioEdita
];
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
    //const myObjStr = JSON.stringify(datos);  
    const myObjStr = JSON.stringify(this.usuarioEdita);  
    sessionStorage.setItem("sesion",myObjStr);
  }

  getData() {
    return sessionStorage.getItem('sesion');
  }

  removeData() {
    sessionStorage.removeItem('location');
  }
}