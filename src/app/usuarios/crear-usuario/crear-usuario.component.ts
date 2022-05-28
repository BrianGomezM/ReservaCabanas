import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.servicios';
import { Usuario } from '../../usuarios/interfaces/usuario.interface';
import { AlertMessage } from '../../alerta/alerta';

declare var $: any;
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  
  varTitulo="Crear Usuario";
  
   usuarioEdita: Usuario={
    idUsuario: 0,
    nombre: "",
    apellido: "",
    idRol: 0,
    tipoDocumento: 0,
    documento: "",
    telefono: "",
    correo: "",
    contrasena: "",
    fechaRegistro: ""
  };
  
 
  constructor(private router: Router, private route: ActivatedRoute, private UsuariosService:UsuariosService) { }
  aler = new AlertMessage();
  
  ngOnInit(): void {
    if(!this.router.url.includes('usuario-editar')){
      return;
    } 
    this.route.params
    .pipe(
      switchMap(({id}) => this.UsuariosService.getUsuarioID(id))
    ).subscribe(usuario =>{this.usuarioEdita = usuario['0']['0'];
    this.varTitulo="Editar Usuario";
  });
  }

  guardar(){
  if(this.usuarioEdita.idUsuario != 0){
    //ACTUALIZAR
    this.UsuariosService.editarUsuario(this.usuarioEdita).subscribe(usuarioEdita=>{
      if(usuarioEdita['status']==200){        
        this.aler.correcto("Bien", "El usurio se actualizo correctamente");
        this.router.navigate(['usuario-listar']);
      }else{
        this.aler.error("Error", "El Usuario no se  actualizo", 'error');
      }
    });
  }else{
    //CREAR USUARIO
    this.UsuariosService.crearUsuario(this.usuarioEdita).subscribe(usuarioEdita=>{
    if(usuarioEdita['status']==200){
      this.aler.correcto("Bien", "El usurio se creo correctamente");
      this.router.navigate(['usuario-listar']);
    }else{
      this.aler.error("Error", "No se creo el usuario en el sistema", 'error');
    }
 })}
}
  cancelar(){
    this.router.navigate(['usuario-listar']);
  }
  
}
