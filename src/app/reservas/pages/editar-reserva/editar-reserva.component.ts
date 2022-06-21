import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessage } from 'app/alerta/alerta';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { ClientesService } from 'app/clientes/services/clientes.service';
import { Abono } from 'app/contable/abonos/interfaces/abono.interface';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { switchMap} from 'rxjs';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {
  reserva:Reserva ={
    id_reserva:"",
    id_cabana:null,
    id_cliente:null,
    estado:"",
    valor_reserva:0,
    descuento:0,
    idUsuario:"",
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
    id_plan:""
  };
  abonos:Abono[];
  total=0;
  totalSaldo=0;
  alert: AlertMessage = new AlertMessage();
  cabanas:Cabana[];
  total_descuento:number = 0;
  flag:boolean=true;
  
  constructor(private activateRoute: ActivatedRoute,private cabanaService: CabanasService, private clienteService:ClientesService,public router:Router, private reservasService:ReservasService) { }

  ngOnInit(): void {
    this.cabanaService.getCabanas().subscribe(
      (cabanas) =>{
        this.cabanas = cabanas;
      }
    );
    this.activateRoute.params
    .pipe(
      switchMap(({ id }) => this.reservasService.reservaId(id))
     
    )
    .subscribe( resp =>{
      this.reserva = resp[0];
      this.reserva.id_cabana= resp[0].id_cabana;
      this.reserva.id_cliente= resp[0].id_cliente;
      this.calculaTotalDescuento();
      this.listarAbonos();
      //this.calculaTotalNoche();
    })
  }
  redirect(){
    this.router.navigate(["reservas"]);
  }
  actualizarCliente(){
    this.clienteService.actualizarCliente(this.reserva.id_cliente[0]).subscribe(
      resp=>{
        console.log("Actuliza cliente");
      }
    )
  }
  actualizarReserva(){
    if(this.flag){
      this.actualizarCliente();
      this.reservasService.actualizarprereserva(this.reserva).subscribe(
        resp=>{
          this.alert.notificacionExito("top", "right", 1, "SUCCESS:", "Reserva actualizada exitosamente");          
        }
      );
    }
  }
  cantidadNoches(){
    //Calcula el total de noches según las fechas seleccionadas
    var diaEnMils = 1000 * 60 * 60 * 24;
    var fecha_fin = this.reserva.fecha_fin;
    var ff = new Date(fecha_fin).getTime();
    var fecha_inicio = this.reserva.fecha_inicio;
    var fi = new Date(fecha_inicio).getTime();
    var dias = ff - fi  + diaEnMils;
    dias = dias / diaEnMils;

    console.log(dias);
    return dias;
  }

  calculaTotalNoche(){
    var dias = this.cantidadNoches();
    var valor_noche =0;
    //calcula el total de la reserva sin descuento, en base al total de días
    if(this.reserva.id_cabana != null){
      valor_noche = Number(this.reserva.id_cabana[0].valor_cabana);
      this.reserva.valor_reserva = valor_noche * dias;
      this.calculaTotalDescuento();
    }
  }
  calculaTotalDescuento(){
    //calcula el total de la reserva con descuento
    var valor_noche = this.reserva.valor_reserva;
    var descuento = Number(this.reserva.descuento);
    var total = valor_noche - descuento;
    this.total_descuento = total;
   
  }
  disponibilidad(value:string){
    this.reserva.id_cabana[0].id_cabana = value;
    
    this.reservasService.verificarDisponibilidad(this.reserva).subscribe(
      resp=>{
        console.log(resp[0]);
        if(resp[0]==null){
          //Si la reserva no está disponible ...
          this.flag=false;
          this.reserva.valor_reserva=0;
          this.total=0;
          this.totalSaldo=0;
          this.total_descuento=0;
          this.alert.notificacionExito("top", "right", 1, "ERROR:", "Cabaña no disponible para la fecha seleccionada");          
        }else{
          //Si la reserva está disponible trae la cabaña y la asigna
          this.flag=true;
          this.reserva.id_cabana = resp;
          this.calculaTotalNoche();
        }
      }
    );
  }
  redirigeAbono(){
    this.router.navigate(["reserva-abonos-crear",this.reserva.id_reserva]);
  }
  
  certificado(){
    var linkCertificado="https://rentcabinsproyect.tk/vista/html/Vista_Generar_Certificado.php?codUser="+this.reserva.id_cliente[0].id_cliente+"&codReserva="+this.reserva.id_reserva;
    this.router.navigate(["/reservas"]).then(result=>{window.open(linkCertificado, "_blank")});
  }
  listarAbonos(){
    this.reservasService.listarAbonosReserva(this.reserva).subscribe(
      resp=>{
        this.abonos=resp['respuesta'];
        this.total = resp['respuesta'][0]['total'];
        this.totalSaldo = this.reserva.valor_reserva - this.total;
        console.log(this.abonos);
        console.log(resp['respuesta']);
      }
    )
  }
  

}
