import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Usuario } from './usuario.module';
import { UsuariosService } from '../usuarios/services/usuarios.servicios';
import { AlertMessage } from '../alerta/alerta';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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
  constructor(private router: Router, private route: ActivatedRoute, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.email && this.password){
      this.UsuariosService.getSesionUser(this.email, this.password).subscribe(resultado=>{
      if(resultado['status'] == 200){
        this.router.navigate(['reservas']);
      }else{       
        this.aler.error("Error", "Usuario incorrecto", 'error');
      }

   });
    }
  }
}
