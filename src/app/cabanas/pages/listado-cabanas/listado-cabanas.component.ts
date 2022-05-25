import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
declare var $: any;
@Component({
  selector: 'app-listado-cabanas',
  templateUrl: './listado-cabanas.component.html',
  styleUrls: ['./listado-cabanas.component.css']
})
export class ListadoCabanasComponent implements OnInit {
  
  @Input() cabanas: Cabana[] = [];
  
  varNombre:String="";
  hayError:boolean=false;
  constructor(private router: Router, private cabanaService: CabanasService) { }

  ngOnInit(): void {
    this.listarCabanas();
  }
  validaEstado(estado:string) {
    var estadoRes:boolean=false;
    if(estado=="1"){
      estadoRes=true;
    }
    return estadoRes;
}
prueba(){
  console.log("funciona prueba");
}
  crearCabana(){
    this.router.navigate(['/cabana-crear']);
  }

  editarCabana(cabana:Cabana){
   
    this.router.navigate(['/cabana-editar',cabana.id_cabana]);
  }

  listarCabanas(){
    this.cabanaService.getCabanas().subscribe(
      (cabanas) =>{
        this.hayError=false;
        this.cabanas = cabanas;
      }, (err)=> {
        this.cabanas=[];
        this.hayError=true;
      }
    )
  }
  cambiarEstadoCabana(cabana:Cabana){
    if(cabana.estado_cabana==1){
      cabana.estado_cabana=0;
    }else{
      cabana.estado_cabana=1;
    }
    this.cabanaService.cambiarEstadoCabana(cabana).subscribe(
    resp=>{
      console.log(resp);
    }
  )
}
  buscarCabana(varNombre:String){
    this.cabanaService.cabañaPorNombre(varNombre).subscribe(
      (cabanas) =>{
        this.hayError=false;
        this.cabanas=cabanas;
      }, (err)=> {
        this.cabanas=[];
        this.hayError=true;
      }
    )
  }
  eliminarCabana(cabana:Cabana){
    this.cabanaService.eliminarCabana(cabana).subscribe(
      resp=>{
        if(resp['status']==200){
        this.showNotification("top", "right", 0, "ÉXITO", "Se ha eliminado la cabaña: " + cabana.nombre_cabana + " Correctamente.");
        this.listarCabanas();
        console.log(resp);
        }else{
          this.showNotification("top", "right", 0, "ERROR", "No se pudo eliminar la cabaña: " + cabana.nombre_cabana + " recargue la pagina e intente nuevamente.");
        }
      }
      
    )
    
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
