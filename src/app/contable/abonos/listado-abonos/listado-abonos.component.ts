import { Component, OnInit, Output } from '@angular/core';
import { Abono } from '../interfaces/abono.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { AbonoService } from '../services/abonos.servicios';
import { AlertMessage } from '../../../alerta/alerta';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listado-abonos',
  templateUrl: './listado-abonos.component.html',
  styleUrls: ['./listado-abonos.component.css']
})
export class ListadoAbonosComponent implements OnInit {
  banderaB:string="0";

  aler = new AlertMessage();
  public param: String="";
  public param1: String="";
  public param2: String="";
  min=0;
  max=5;
  public abonos:Array<Abono> = [];
  public paginar:Array<Abono> = [];
  @Output()  usuario:Abono={
    idAbono: 0,
    fechaRegistro: "",
    valorAbonado: "0",
    observacion: "",
    banco: 0,
    codPago: 0,
    idReserva: "",
    fechaPago: "",
    usuario: "",
    cliente:"",
    estadoReserva: 0
  }
  constructor(private router: Router, private route: ActivatedRoute, private AbonoService:AbonoService) { }

  ngOnInit(): void {
    this.min = 0;
    this.max= 5;
    this.AbonoService.getAbonos()
    .subscribe((respuesta:any)=>{
      this.abonos = respuesta['respuesta'];
      this.paginar=this.abonos.slice(this.min,this.max);
    }
      //usuario => this.usuarios = usuario
      ); 
  }
  crearAbono(){  
    this.router.navigate(['abonos-crear']);
  }
  editar(index){
    this.router.navigate(['abonos-crear',index]);
  }
  eliminarUsuario(idAbono){
    Swal.fire({
      title: "Esta seguro?",
      text: "Se borrara  de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El registro seleccionado fue eliminado correctamente.',
          'success') 
          this.AbonoService.eliminarAbono(idAbono).subscribe(
            resp=>{
              this.ngOnInit();
           });
      }
    }); 
  }

  buscarAbono(){    
    switch(parseInt(this.banderaB)){
      case 1:
        if(this.param!=""){
              this.min = 0;
              this.max= 5;
              this.AbonoService.buscarAbonoxNombreCU(this.param)
              .subscribe((respuesta:any)=>{
                if(respuesta['status']!=400){
                  this.abonos = respuesta['respuesta'];
                  this.paginar=this.abonos.slice(this.min,this.max);
                }else{
                  this.aler.notificacionExito("bottom","center",2,"Advertencia","No hay registros con el nombre "+this.param+"!");
                }                
              });
        }else{
          this.aler.notificacionExito("bottom","center",2,"Advertencia","Ingrese el nombre del cliente o el usuario a buscar!");
        }
      break;
      case 2:
        if(this.param1 && this.param2){
          if(this.param1 >= this.param2){
              this.min = 0;
              this.max= 5;
              this.AbonoService.buscarAbonoxfecha(this.param1,this.param2)
              .subscribe((respuesta:any)=>{
                if(respuesta['status']!=400){
                  this.abonos = respuesta['respuesta'];
                  this.paginar=this.abonos.slice(this.min,this.max);
                }else{
                  this.aler.notificacionExito("bottom","center",2,"Advertencia","No hay registros en el rango de fechas seleccionado "+"<br> Fehca superior: "+this.param1+"<br> Fecha inferior: "+this.param2);
                }                
              });
          }else{
            var texto = "Seleccionar las fechas correspondientes <br> La fecha superior: "+this.param1+" no debe ser menor a la inferior: "+this.param2;
            this.aler.notificacionExito("bottom","center",2,"Advertencia",texto);
          }
        }else{
          this.aler.notificacionExito("bottom","center",2,"Advertencia","Ingrese las fechas a filtrar!");
        }     
      break;
      default:
        this.aler.notificacionExito("bottom","center",2,"Advertencia","Seleccione el tipo de busqueda!");
      break;  
    }
  }

  convertir(rol): string{
    var respuesta:string = "";
    switch(parseInt(rol)){
      case 1:          
        respuesta = "BBVA";
      break;
      case 2:
        respuesta = "Banco de bogota";
      break;
      case 3:
        respuesta = "Bancolombia";
      break;
      case 4:
        respuesta = "Banco Davivienda";
      break
      case 5:
        respuesta = "David Plata";
      break
      case 6:
        respuesta = "Gane";
      break
      case 7:
        respuesta = "Nequi";
      break
      default:
        respuesta = "Error";
      break
    }return respuesta;
  }
  
  next(minE, maxE){
    if(maxE != this.abonos.length && maxE <= this.abonos.length ){
         if((maxE+5)>this.abonos.length){
           this.max = maxE=this.abonos.length;
           this.min = minE + 5;
         }else{
               this.max = maxE + 5;
               this.min = minE + 5;
         }
         this.paginar=this.abonos.slice(this.min,this.max);
    }
   }

 previous(minE, maxE){
   if(minE != 0){
     if((minE-5)<=0){
       this.max = 5;
       this.min = 0;
     }else{
           this.max = maxE - 5;
           this.min = minE - 5;
     }
     this.paginar=this.abonos.slice(this.min,this.max);
  }   
}

formatearPeso(valor){
  valor = parseInt(valor);
  const resultado = valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });
  return resultado;
}

convertDateFormat(string) {
  var info = string.split('-').reverse().join('/');
  return info;
}
}
