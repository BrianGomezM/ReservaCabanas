import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { Cliente } from 'app/clientes/interfaces/clientes.interface';

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

  constructor(public router:Router, private cabanaService: CabanasService, private reservasService:ReservasService) { }

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

  crearpreReserva(){
    this.reservasService.crearpreReserva(this.reserva).subscribe(
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
        console.log(resp.id_reserva);
        console.log(resp.descuento);
      }
    );
  }
}
