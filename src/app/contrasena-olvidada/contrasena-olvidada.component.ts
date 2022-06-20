import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios/services/usuarios.servicios';
import { AlertMessage } from '../alerta/alerta';
declare var $: any;
@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.component.html',
  styleUrls: ['./contrasena-olvidada.component.css']
})
export class ContrasenaOlvidadaComponent implements OnInit {
  aler = new AlertMessage();
  correo : string;
  constructor(private router: Router, private route: ActivatedRoute, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
  }
  validarFormulario(){
    var  respuesta = true;
    var emailV = document.getElementById('email')as HTMLInputElement;
    var errorEmail = document.getElementById('errorEmail');
    errorEmail.style.color = 'red';

    var mensajeErrorE=[];
    if(emailV.value === null || emailV.value ===''){
      mensajeErrorE.push('Ingrese un correo');
      respuesta=false;
    }else if(!this.validarEmail(emailV.value)){
      mensajeErrorE.push('Correo incorrecto');
      respuesta=false;
    }else{
      mensajeErrorE.push('&nbsp;');
    }
    errorEmail.innerHTML = mensajeErrorE.join(',');
    if(respuesta){
      this.olvidarC();
    }
  }

  validarEmail(valor) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor); 
  }

  olvidarC(){
   if(this.correo){
    this.UsuariosService.getOlvidoC(this.correo).subscribe(resultado=>{
      console.log(resultado);
      if(resultado['status'] == 200){
        this.aler.correcto("Correo recuperado", "Verificar su correo electronico");
        this.router.navigate(['/']);
      }else{       
        this.aler.error("Error", "Usuario incorrecto", 'error');
      }
   });
  }
}
}
