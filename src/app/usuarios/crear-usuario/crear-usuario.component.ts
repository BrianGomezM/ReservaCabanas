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
  correoVer=true;
  editarCorreo="";
  varTitulo="Crear usuario";
 
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
    ).subscribe(usuario =>{
       this.usuarioEdita = usuario['respuesta']['0'];
       this.editarCorreo =usuario['respuesta']['0']['correo'];
       this.correoVer=false;
       this.varTitulo="Editar usuario";
  });
  }

  formatear(input){
    var num = input.value.replace(/\./g,'');
      if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        input.value = num;
      }else{ 
          alert('Solo se permiten numeros');
          input.value = input.value.replace(/[^\d\.]*/g,'');
      }
    }

  validarFormulario(){
    var respuesta = true;
    var nombreV = document.getElementById('nombre')as HTMLInputElement;
    var apellidoV = document.getElementById('apellido')as HTMLInputElement;
    var rolUserV = document.getElementById('rolUser')as HTMLInputElement;
    var tipoDocV = document.getElementById('tipoDoc')as HTMLInputElement;
    var documentoV = document.getElementById('documento')as HTMLInputElement;
    var telefonoV = document.getElementById('telefono')as HTMLInputElement;
    var correoV = document.getElementById('correo')as HTMLInputElement;
    var contrasenaV = document.getElementById('contrasena')as HTMLInputElement;

    var errorNombre = document.getElementById('errorNombre');
    var errorApellido = document.getElementById('errorApellido');
    var errorRolUser = document.getElementById('errorRol');
    var errorTD = document.getElementById('errorTipoDoc');
    var errorDocumento = document.getElementById('errorNDoc');
    var errorTelefono = document.getElementById('errorNTelefono');
    var errorCorreo = document.getElementById('errorCorreo');
    var errorContrasena = document.getElementById('errorContrasena');
    if(nombreV.value === null || nombreV.value ===''){
      errorNombre.innerHTML = 'Ingrese un nombre';
      respuesta=false;
    }else if(this.validarTexto(nombreV.value)){
      errorNombre.innerHTML = 'Nombre incorrecto';
      respuesta=false;
    }
    if(apellidoV.value === null || apellidoV.value ===''){
      errorApellido.innerHTML = 'Ingrese un apellido';
      respuesta=false;
    }else if(this.validarTexto(apellidoV.value)){
      errorApellido.innerHTML ='Apellido incorrecto';
      respuesta=false;
    } if(rolUserV.value === "0"){
      errorRolUser.innerHTML = 'Seleccione un rol';
      respuesta=false;
    } if(tipoDocV.value === "0"){
      errorTD.innerHTML = 'Seleccione un tipo de documento';
      respuesta=false;
    }if(documentoV.value === null || documentoV.value ===''){
      errorDocumento.innerHTML = 'Ingrese un número de documento';
      respuesta=false;
    }else if(this.validarLongitud(documentoV.value, 1)){
      errorDocumento.innerHTML = 'Número de documento incorrecto';
      respuesta=false;
    } if(telefonoV.value === null || telefonoV.value ===''){
      errorTelefono.innerHTML = 'Ingrese el número de teléfono';
      respuesta=false;
    }else if(this.validarLongitud(telefonoV.value, 2)){
      errorTelefono.innerHTML = 'Número de teléfono incorrecto';
      respuesta=false;
    } if(correoV.value === null || correoV.value ===''){
      errorCorreo.innerHTML = 'Ingrese un correo electrónico';
      respuesta=false;
    }else if(!this.validarEmail(correoV.value)){
      errorCorreo.innerHTML = 'Correo electrónico incorrecto ';
      respuesta=false;
    }else if (this.correoVer){
      errorCorreo.innerHTML = 'Diligencie otro correo electronico';
      respuesta=false;

    }
    if(contrasenaV.value === null || contrasenaV.value ===''){
      errorContrasena.innerHTML = 'Ingrese una contraseña';
      respuesta=false;
    }
    if(respuesta){
      this.guardar();
    }
  }

  validarEmail(valor) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor); 
  }

  validarTexto(valor){
    const pattern = new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}");
    var key = String.fromCharCode(!valor.charCode ? valor.which : valor.charCode);
    if(!pattern.test(valor)){     
      return true;
    }return false;
  }



  guardar(){
  if(this.usuarioEdita.idUsuario != 0){
    //ACTUALIZAR
    this.UsuariosService.editarUsuario(this.usuarioEdita).subscribe(usuarioEdita=>{
      if(usuarioEdita['status']==200){        
        this.aler.correcto("Bien", "El usurio se actualizo correctamente");
        this.router.navigate(['usuario-listar']);
      }else{
        this.aler.error("Error", "El usuario no se  actualizo", 'error');
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
  limpiar(op){
    var errorNombre = document.getElementById('errorNombre');
    var errorApellido = document.getElementById('errorApellido');
    var errorRolUser = document.getElementById('errorRol');
    var errorTD = document.getElementById('errorTipoDoc');
    var errorDocumento = document.getElementById('errorNDoc');
    var errorTelefono = document.getElementById('errorNTelefono');
    var errorCorreo = document.getElementById('errorCorreo');
    var errorContrasena = document.getElementById('errorContrasena');
    
     switch(op){
        case 1:
          errorNombre.innerHTML = '&nbsp;';
        break;
        case 2:
          errorApellido.innerHTML = '&nbsp;';
        break;
        case 3:
          errorRolUser.innerHTML = '&nbsp;';
        break;
        case 4:
          errorTD.innerHTML = '&nbsp;';
        break;
        case 5:
          errorDocumento.innerHTML = '&nbsp;';          
        break;
        case 6:
          errorTelefono.innerHTML = '&nbsp;';
        break;
        case 7:
          errorCorreo.innerHTML = '&nbsp;';
        break;
        case 8:
          errorContrasena.innerHTML = '&nbsp;';
        break;
        default:
          console.log("Error");
        break;  
     }
   }

   validarDC(opt){
      if(opt  !== null && opt !=='' && this.validarEmail(opt)){
        console.log(this.editarCorreo, "--", opt);
        if(this.editarCorreo != opt){
            this.UsuariosService.validarDC(opt).subscribe(respuesta=>{
              if(respuesta['status']==200){         
                this.aler.error("Advertencia", "El correo ingresado le pertenece a otro usuario, por favor corregir", 'warning');
                this.correoVer=true;
              }else{
                this.correoVer=false;
              }
            });
        }else{
          this.correoVer=false;
        }
      }
    }
  

    validarLongitud(valor,opc){
      if((opc == 1) && ((valor.length>4) && (valor.length<15))){
          return false;
      } else if((opc ==2) && (valor.length == 10)){
        return false;        
      }else{
        return true;
      }
    }
}
