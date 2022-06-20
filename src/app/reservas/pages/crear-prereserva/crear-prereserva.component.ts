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
  reserva:Reserva={
    id_reserva:"",
    id_cabana:null,
    id_cliente:null,
    valor_reserva:"",
    descuento:"",
    idUsuario:"",
    fecha_inicio:null,
    fecha_fin:null,
    estado:"todo"
  };
  cabanas:Cabana[]=[];
  flag:boolean=false;
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

  validarDisponibilidad(){

      this.reservasService.verificarDisponibilidad(this.reserva).subscribe(
        resp=>{
          for(var i=0; i<resp.length;i++){
            if(resp[i].id_cabana==this.reserva.id_cabana){
                this.flag=true;
            }else{
              this.flag=false;
            }
          }
          if(!this.flag){
            this.cabanas=resp;
            this.alert.notificacionExito("top", "right", 1, "ERROR:", "Cabaña no disponible para la fecha seleccionada");
          
          }
        }
      );
  }

  crearpreReserva(){
    this.clienteService.agregarCliente(this.cliente).subscribe(
      resp=>{
        this.reserva = {
          id_reserva:"",
          id_cabana:null,
          id_cliente:null,
          valor_reserva:"",
          descuento:"",
          idUsuario:"",
          fecha_inicio:null,
          fecha_fin:null,
          estado:""
        };
        this.redirect();
        // console.log(resp.id_reserva);
        // console.log(resp.descuento);
      }
    )
  }  
}
