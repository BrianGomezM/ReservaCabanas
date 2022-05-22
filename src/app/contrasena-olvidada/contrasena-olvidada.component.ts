import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios/services/usuarios.servicios';
declare var $: any;
@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.component.html',
  styleUrls: ['./contrasena-olvidada.component.css']
})
export class ContrasenaOlvidadaComponent implements OnInit {
  correo : string;
  constructor(private router: Router, private route: ActivatedRoute, private UsuariosService:UsuariosService) { }

  ngOnInit(): void {
  }

  olvidarC(){
   if(this.correo){
    this.UsuariosService.getOlvidoC(this.correo).subscribe(resultado=>{
      console.log(resultado);
      if(resultado['status'] == 200){
        this.showNotification("top", "center", 0, "ÉXITO", "Verificar el correo electronico");
        this.router.navigate(['/']);
      }else{       
        this.showNotification("top", "center", 1, "ERROR", "Correo Incorrecto");
      }
   });
  }
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
