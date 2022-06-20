import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './usuario.module';
import { UsuariosService } from '../usuarios/services/usuarios.servicios';
import { AlertMessage } from '../alerta/alerta';
import { AdminGuard } from '../guardianes/admin.guard';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  aler = new AlertMessage();
  email : string;
  password: string;
  var: Usuario;
  mensaje: boolean = false;
  constructor(private promess:AdminGuard, private router: Router, private route: ActivatedRoute, private userService:UsuariosService) { }




  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
  }

  validarFormulario(){
      var  respuesta = true;
      var emailV = document.getElementById('email')as HTMLInputElement;
      var passwordV = document.getElementById('password')as HTMLInputElement;
      var errorEmail = document.getElementById('errorEmail');
      var errorPass = document.getElementById('errorPass');
      errorEmail.style.color = 'red';
      errorPass.style.color = 'red';

      var mensajeErrorE=[];
      var mensajeErrorP=[];
      if(emailV.value === null || emailV.value ===''){
        mensajeErrorE.push('Ingrese un correo');
        respuesta=false;
      }else if(!this.validarEmail(emailV.value)){
        mensajeErrorE.push('Correo incorrecto');
        respuesta=false;
      }else{
        mensajeErrorE.push('&nbsp;');
      }
      if(passwordV.value === null || passwordV.value ===''){
        mensajeErrorP.push('Ingresar una contraseña');
        respuesta=false;
      }else{
        mensajeErrorP.push('&nbsp;');
      }
      errorEmail.innerHTML = mensajeErrorE.join(',');
      errorPass.innerHTML = mensajeErrorP.join(',');
      if(respuesta){
        this.login();
      }
    }

    validarEmail(valor) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor); 
    }

  login(){
     this.userService.getSesionUser(this.email, this.password).subscribe(resultado=>{
      if(resultado['status'] == 200){  
        this.promess.registrarDatos(resultado['respuesta']['0']);
        this.router.navigate(['reservas']);       
      }else{       
        this.aler.error("Error", "Usuario incorrecto", 'error');
      }
   });
  }
}
