import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Usuario } from './usuario.module';
import { UsuariosService } from '../usuarios/services/usuarios.servicios';

declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  

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
        this.showNotification('top','center');
      }

   });
    }
  }


  showNotification(from, align){
      const type = ['danger'];
      const color = 0;
      $.notify({
          icon: "Error",
          message: "Usuario Incorrecto</b>"
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
