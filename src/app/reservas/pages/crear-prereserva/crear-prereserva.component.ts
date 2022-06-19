import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { Cliente } from 'app/clientes/interfaces/clientes.interface';
import { ClientesService } from 'app/clientes/services/clientes.service';
import { AlertMessage } from 'app/alerta/alerta';

@Component({
  selector: 'app-crear-prereserva',
  templateUrl: './crear-prereserva.component.html',
  styleUrls: ['./crear-prereserva.component.css']
})
export class CrearPrereservaComponent implements OnInit {
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
  reserva:Reserva={
    id_reserva:"",
    id_cabana:this.cabana,
    id_cliente:this.cliente,
    valor_reserva:0,
    descuento:0,
    idUsuario:"",
    fecha_inicio:"",
    fecha_fin:"",
    estado:""
  };
  cabanas:Cabana[]=[];
  flag:boolean = true;
  alert: AlertMessage = new AlertMessage();
  constructor(public router:Router, private clienteService: ClientesService, private cabanaService: CabanasService, private reservasService:ReservasService) { }

  ngOnInit(): void {
    this.cabanaService.getCabanas().subscribe(
      (cabanas) =>{
        this.cabanas = cabanas;
        
      }
    );
  }
  redirect(){
    this.router.navigate(["reservas"]);
  }

  verificarDisponibilidad(){
    // var fecha_fin = this.reserva.fecha_fin.split('-');
    // var ff = new Date(parseInt(fecha_fin[0]),parseInt(fecha_fin[1])-1,parseInt(fecha_fin[2]));
    // var fecha_inicio = this.reserva.fecha_inicio.split('-');
    // var fi = new Date(parseInt(fecha_inicio[0]),parseInt(fecha_inicio[1])-1,parseInt(fecha_inicio[2]));
    // if( (ff.getDay() == 0 || ff.getDay() == 1 ||ff.getDay() == 5 || ff.getDay() == 6)){
    //     console.log("fecha final");
    // } 
    // if(fi.getDay() == 0 || fi.getDay() == 1 ||fi.getDay() == 5 || fi.getDay() == 6  ){
    //     console.log("Fecha inicial");
    // }
    this.reservasService.verificarDisponibilidad(this.reserva).subscribe(
      resp=>{
        if(resp.length==0){
          this.flag=false;
          this.alert.notificacionExito("top", "right", 1, "ERROR:", "Cabaña no disponible para la fecha seleccionada");
        }else{
          this.flag=true;
        }
      }
    )
  }
 

  crearpreReserva(){
    
    if(this.flag){
      this.clienteService.agregarCliente(this.cliente).subscribe(
        resp=>{
          this.reserva.id_cliente.id_cliente=resp.id_cliente;
          this.reservasService.crearpreReserva(this.reserva).subscribe(
            resp=>{
              this.reserva = {
                id_reserva:"",
                id_cabana:null,
                id_cliente:null,
                valor_reserva:0,
                descuento:0,
                idUsuario:"",
                fecha_inicio:"",
                fecha_fin:"",
                estado:""
              };
              this.redirect();
            }
          );
        }
      )
    }

  }  
}
