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
  cabanasActual: Cabana[]=[];
  filtroTodas:boolean=false;
  filtroHabilitadas:boolean=false;
  filtroInhabilitadas:boolean=false;
  varNombre:String="";
  hayError:boolean=false;
  constructor(private router: Router, private cabanaService: CabanasService) { }

  ngOnInit(): void {
    this.filtroTodas=true;
    this.listarCabanas();
  }
  validaEstado(estado:string) {
    var estadoRes:boolean=false;
    if(estado=="1"){
      estadoRes=true;
    }
    return estadoRes;
}
filtrarCabanas(value){
  this.cabanasActual= [];
  if(value=="0"){
    this.filtroTodas=true;
    this.filtroHabilitadas=false;
    this.filtroInhabilitadas=false;
    console.log("Opcion 1");
    console.log(this.cabanas.length)
    for(let cabana of this.cabanas){
      cabana.visibilidad=true;
      this.cabanasActual=this.cabanas;
    }
  }
  if(value=="1"){
    this.filtroTodas=false;
    this.filtroHabilitadas=true;
    this.filtroInhabilitadas=false;
    console.log("Opcion 2");
    for(let cabana of this.cabanas){
      if(cabana.estado_cabana==1){
        cabana.visibilidad=true;
        this.cabanasActual.push(cabana);
        console.log("Id:" + cabana.id_cabana +" Estado:"+ cabana.estado_cabana  +" Visibilidad:"+ cabana.visibilidad);
      }
      else{
        cabana.visibilidad=false;
      }
    }
  }
  if(value=="2"){
    this.filtroTodas=false;
    this.filtroHabilitadas=false;
    this.filtroInhabilitadas=true;
    console.log("Opcion 3")
    for(let cabana of this.cabanas){
      if(cabana.estado_cabana==0){
        console.log("Id:" + cabana.id_cabana +" Estado:"+ cabana.estado_cabana  +" Visibilidad:"+ cabana.visibilidad);
        cabana.visibilidad=true;
        this.cabanasActual.push(cabana);
      }
      else{
        cabana.visibilidad=false;
      }
    }    
  }
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
        this.filtroTodas=true;
        this.filtrarCabanas("0");
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
      if(resp['status']==200){
        this.showNotification("top", "right", 0, "ÉXITO", "Se cambiado el estado de la cabaña: " + cabana.nombre_cabana + " Correctamente.");
      this.listarCabanas();
      this.filtroTodas=true;
      }else{
        this.showNotification("top", "right", 1, "ERROR", "No se pudo cambiar el estado de la cabaña: " + cabana.nombre_cabana + " recargue la pagina e intente nuevamente.");
      }
    }
  )
}
  buscarCabana(varNombre:String){
    this.cabanaService.cabañaPorNombre(varNombre).subscribe(
      (cabanas) =>{
        this.hayError=false;
        this.cabanas=cabanas;
        this.cabanasActual=cabanas;
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
        this.filtroTodas=true;
        console.log(resp);
        }else{
          this.showNotification("top", "right", 1, "ERROR", "No se pudo eliminar la cabaña: " + cabana.nombre_cabana + " recargue la pagina e intente nuevamente.");
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
