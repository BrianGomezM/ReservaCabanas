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
