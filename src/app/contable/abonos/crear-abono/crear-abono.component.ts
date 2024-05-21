import { Component, OnInit,Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbonoService } from '../services/abonos.servicios';
import { Abono } from '../interfaces/abono.interface';
import { AdminGuard } from '../../../guardianes/admin.guard';
import { datosreservaxbono } from '../interfaces/datosreserva.interface';
import { AlertMessage } from '../../../alerta/alerta';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-crear-abono',
  templateUrl: './crear-abono.component.html',
  styleUrls: ['./crear-abono.component.css']
})
export class CrearAbonoComponent implements OnInit {
  abonoxReserva = 0;
  banderaS=false;
  varTitulo="Crear abono";
  totalAbonado="$ 0";
  nombreUsuario="";
  mostrarC=false;
  debe="$ 0";
  totalApagar="$ 0";
  aler = new AlertMessage();
  public datosAbonos:Array<datosreservaxbono> = [];
  abonoEdita: Abono={
      idAbono: 0,
      fechaRegistro: "",
      valorAbonado: "$ 0",
      observacion: "",
      banco: 0,
      codPago: 0,
      idReserva: "",
      fechaPago: "",
      usuario: "",
      cliente:"",
      estadoReserva: 0
  }

  datosxbono: datosreservaxbono={
    id_reserva: 0,
    id_cliente: 0,
    valor_reserva: "$ 0",
    clientes: "",
    totalAbonos:"",
    estadoReserva: 0
}


  constructor(private promess:AdminGuard, private route: ActivatedRoute, private router: Router,private AbonoService:AbonoService) { 
    var User = JSON.parse(this.promess.getData());
    this.abonoEdita.usuario = User['idUsuario'];
    this.nombreUsuario = User['nombre']+" "+User['apellido'];
  }

  ngOnInit(): void {
    //Crear abono
    if(!this.router.url.includes('abonos-crear/')){     
      this.consultarDatosRA();
      return;
    }else if(this.router.url.includes('reserva-abonos-crear/')){    
      this.abonoxReserva = this.route.params['_value']['id'];
      this.datosxbono.id_reserva = this.abonoxReserva;
      this.consultarDatosRA(); 
      this.banderaS=true;
      return;
    } 
   this.route.params
    .pipe(
      switchMap(({id}) => this.AbonoService.buscarAbonoID(id))
    ).subscribe(respuesta =>{           
       this.abonoEdita = respuesta['respuesta']['0'];
       this.datosxbono.id_reserva = respuesta['respuesta']['0']['idReserva'];
       this.consultarDatosRA(); 
       this.varTitulo="Editar abono";
       this.banderaS=true;
  });
  }

  consultarDatosRA(){
    this.AbonoService.buscarDatosReservaxBono()
    .subscribe((respuesta:any)=>{       
      this.datosAbonos = respuesta['respuesta'];
      this.validarResultado();
      this.formatearValor();     
    });
  }

  limpiar(opcion){
    var errorFechaPago = document.getElementById('errorFechaPago');
    var errorBanco = document.getElementById('errorBanco');
    var errorAbonado = document.getElementById('errorAbonado');
    var errorCodReserva = document.getElementById('errorCodReserva');
    var errorCodPag = document.getElementById('errorCodPag');
    switch(opcion){
      case 1:
        errorFechaPago.innerHTML = '&nbsp;';
      break;
      case 2:
        errorBanco.innerHTML = '&nbsp;';
      break;
      case 3:
        errorAbonado.innerHTML = '&nbsp;';
      break;
      case 4:
        errorCodReserva.innerHTML = '&nbsp;';
      break;
      case 5:
        errorCodPag.innerHTML = '&nbsp;';          
      break;      
      default:
        console.log("Error");
      break;  
   }
  }

  cancelar(){
    this.router.navigate(['abonos']);
  }
  validarFormulario(){
    var respuesta = true;
    var fechaPV = document.getElementById('fechaPago')as HTMLInputElement;
    var tipoVancoV = document.getElementById('banco')as HTMLInputElement;
    var valorAbonadoV = document.getElementById('valorAbonado')as HTMLInputElement;
    var codigoReservaV = document.getElementById('id_reserva')as HTMLInputElement;
    var codigoPagoV = document.getElementById('codPago')as HTMLInputElement;
    var errorFechaPago = document.getElementById('errorFechaPago');
    var errorBanco = document.getElementById('errorBanco');
    var errorAbonado = document.getElementById('errorAbonado');
    var errorCodReserva = document.getElementById('errorCodReserva');
    var errorCodPag = document.getElementById('errorCodPag');
    if(fechaPV.value === ""){
      errorFechaPago.innerHTML = 'Ingrese una fecha de pago';
      respuesta=false;
    }if(tipoVancoV.value === "0"){
      errorBanco.innerHTML = 'Seleccione un tipo de banco';
      respuesta=false;
    }if(valorAbonadoV.value === "$ 0"){
      errorAbonado.innerHTML = 'Ingrese un valor abonado';
      respuesta=false;
    }if(codigoReservaV.value === "0"){
      errorCodReserva.innerHTML = 'Seleccione un codigo de reserva';
      respuesta=false;
    }if(codigoPagoV.value === "0"){
      errorCodPag.innerHTML = 'Ingrese un codigo de abono';
      respuesta=false;
    }if(!this.validarRecalculo()){
      respuesta=false;
    }if(respuesta){
      this.guardar();
    }
  }

  
  guardar(){
    if(this.abonoEdita.idAbono == 0){
      this.AbonoService.crearAbono(this.abonoEdita).subscribe(respuesta=>{
        if(respuesta['status']==200){
          this.aler.correcto("Bien", "El abono se creo correctamente");
          if(this.abonoxReserva != 0){
            this.router.navigate(['reservas']);
          }else{
            this.router.navigate(['abonos']);
          }        
        }else{
          this.aler.error("Error", "No se creo el abono en el sistema", 'error');
        }
     });
    }else{
      this.AbonoService.editarAbono(this.abonoEdita).subscribe(respuesta=>{
        if(respuesta['status']==200){       
          this.aler.correcto("Bien", "El abono se actualizo correctamente");
          this.router.navigate(['abonos']);
        }else{
          this.aler.error("Error", "El abono no se  actualizo", 'error');
        }     
      });
    }
    }
    
  
  formatearValor(){  
    var resultado = "$ 0";
    var montoFormat = (this.abonoEdita.valorAbonado.replace(/[$.]/g,''));
    const regex = /^[0-9]*$/;
    if(montoFormat.trim().length>0 && regex.test(montoFormat.trim())){
      const valor = parseInt((montoFormat));
      resultado = valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
    }
    this.abonoEdita.valorAbonado= resultado;
    this.calcular(this.totalApagar, this.abonoEdita.valorAbonado);
    this.validarRecalculo();
  }

  formatearValo1(dato){
    const valor = parseInt(dato);
    const resultado = valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
    return resultado;
  }

  validarRecalculo(){
    var montoFormat1 = parseInt(this.abonoEdita.valorAbonado.replace(/[$.]/g,''));
    var montoFormat2 = parseInt(this.debe.replace(/[$.]/g,''));
    if(montoFormat1 > 0  && this.abonoEdita.idReserva != ""){
      if(montoFormat1 <= montoFormat2){
        return true;
      }else{
        this.aler.notificacionExito("bottom","center",2,"Advertencia","Verificar el valor abonado.<br>El valor abonado es mayor al valor que se debe.");
        return false;
      }
    }return false;   
  }

  calcular(valorApagar, abono){
    var montoFormat1 = valorApagar.replace(/[$.]/g,'');
    var montoFormat2 = abono.replace(/[$.]/g,'');
    var resultado = montoFormat1-montoFormat2;
    return this.formatearValo1(resultado);
  }
  validarResultado(){
    for(var i=0; i < this.datosAbonos.length; i++){
      if(this.datosAbonos[i]['id_reserva'] == this.datosxbono.id_reserva){
        this.abonoEdita.idReserva = this.datosAbonos[i]['id_reserva'];
        this.abonoEdita.cliente =this.datosAbonos[i]['clientes'];
        this.totalApagar = this.formatearValo1(this.datosAbonos[i]['valor_reserva']);
        this.totalAbonado =this.formatearValo1(this.datosAbonos[i]['totalAbonos']);
        this.debe = this.calcular(this.totalApagar, this.totalAbonado);
        this.abonoEdita.estadoReserva=this.datosAbonos[i]['estado'];
        this.validarRecalculo();
      }
    }
  }
}
