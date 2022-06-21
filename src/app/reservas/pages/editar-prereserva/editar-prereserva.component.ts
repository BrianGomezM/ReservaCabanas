import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessage } from 'app/alerta/alerta';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Cliente } from 'app/clientes/interfaces/clientes.interface';
import { ClientesService } from 'app/clientes/services/clientes.service';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { switchMap} from 'rxjs';

@Component({
  selector: 'app-editar-prereserva',
  templateUrl: './editar-prereserva.component.html',
  styleUrls: ['./editar-prereserva.component.css']
})
export class EditarPrereservaComponent implements OnInit {
  cliente:Cliente={
    id_cliente:"",
    nombre_cliente:"",
    apellido_cliente:"",
    numero_documento:"",
    tipo_documento:"",
    telefono_cliente:"",
    telefono2_cliente:"",
    correo_cliente:""
  }
  cabana:Cabana={
    id_cabana:"",
     nombre_cabana:"",
     descripcion_cabana:"",
     capacidad_cabana: 0,
     valor_cabana:"",
     estado_cabana:1,
     visibilidad:true,
     imagenesList:[]
  }
  prereserva:Reserva={
    id_reserva:"",
    id_cabana:[this.cabana],
    id_cliente:[this.cliente],
    estado:"",
    valor_reserva:0,
    descuento:0,
    idUsuario:"",
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
    id_plan:""
  }

  cabanas:Cabana[];
  alert: AlertMessage = new AlertMessage();
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
      this.prereserva = resp[0];
      this.prereserva.id_cabana= resp[0].id_cabana;
      this.prereserva.id_cliente= resp[0].id_cliente;
      this.calculaTotalNoche();
    })
  }

  redirect(){
    this.router.navigate(["reservas"]);
  }

  editarReserva(){
    this.prereserva.descuento = Number(this.prereserva.descuento);
    this.prereserva.valor_reserva = Number(this.prereserva.valor_reserva);
    if(this.flag){
      this.actualizarCliente();
      this.reservasService.actualizarprereserva(this.prereserva).subscribe(
        resp=>{
          this.alert.notificacionExito("top", "right", 0, "SUCCESS:", "La prereserva se ha actualizado correctamente");
          this.redirect();
        }
      )
    }

  }

  actualizarCliente(){
    this.clienteService.actualizarCliente(this.prereserva.id_cliente[0]).subscribe(
      resp=>{
        console.log("Actuliza cliente");
      }
    )
  }
  
  disponibilidad(value:string){
    this.prereserva.id_cabana[0].id_cabana = value;
    
    this.reservasService.verificarDisponibilidad(this.prereserva).subscribe(
      resp=>{
        console.log(resp[0]);
        if(resp[0]==null){
          //Si la reserva no está disponible ...
          this.flag=false;
          this.prereserva.valor_reserva=0;
          this.total_descuento=0;
          this.alert.notificacionExito("top", "right", 1, "ERROR:", "Cabaña no disponible para la fecha seleccionada");          
        }else{
          //Si la reserva está disponible trae la cabaña y la asigna
          this.flag=true;
          this.prereserva.id_cabana = resp;
          this.calculaTotalNoche();
        }
      }
    );
  }
 
  
  cantidadNoches(){
    //Calcula el total de noches según las fechas seleccionadas
    var diaEnMils = 1000 * 60 * 60 * 24;
    var fecha_fin = this.prereserva.fecha_fin;
    var ff = new Date(fecha_fin).getTime();
    var fecha_inicio = this.prereserva.fecha_inicio;
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
    if(this.prereserva.id_cabana != null){
      valor_noche = Number(this.prereserva.id_cabana[0].valor_cabana);
      this.prereserva.valor_reserva = valor_noche * dias;
      this.calculaTotalDescuento();
    }
  }
  calculaTotalDescuento(){
    //calcula el total de la reserva con descuento
    var valor_noche = this.prereserva.valor_reserva;
    var descuento = Number(this.prereserva.descuento);
    var total = valor_noche - descuento;
    this.total_descuento = total;
   
  }
  redirigeAbono(){
    this.router.navigate(["reserva-abonos-crear",this.prereserva.id_reserva]);
  }

}
