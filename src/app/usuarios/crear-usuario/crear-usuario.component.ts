import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.servicios';
import { Usuario } from '../../usuarios/interfaces/usuario.interface';

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
        this.showNotification("top", "center", 0, "ÉXITO", "Se actualizo el usuario");
      }else{
        this.showNotification("top", "center", 1, "ERROR", "No se actualizo el usuario");
      }
    });
  }else{
    //CREAR USUARIO
    this.UsuariosService.crearUsuario(this.usuarioEdita).subscribe(usuarioEdita=>{
    if(usuarioEdita['status']==200){
      this.showNotification("top", "center", 0, "ÉXITO", "Se creo el usuario");
    }else{
      this.showNotification("top", "center", 1, "ERROR", "No se creo el usuario");
    }
     // console.log(usuarioEdita);
    this.router.navigate(['usuario-listar']);
 })}
}
  cancelar(){
    this.router.navigate(['usuario-listar']);
  }

  validarCampos(opcion){
  }

  showNotification(from, align, opcion, titulo, mesanje){
        const type = ['success','danger'];
        const color = opcion;
        $.notify({
            icon: titulo,
            message: mesanje
        },{
            type: type[color],
            timer: 2000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
}
