import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { ReservasService } from 'app/reservas/services/reservas.service';

@Component({
  selector: 'app-crear-prereserva',
  templateUrl: './crear-prereserva.component.html',
  styleUrls: ['./crear-prereserva.component.css']
})
export class CrearPrereservaComponent implements OnInit {
  reserva:Reserva={
    id_reserva:"",
    id_cabana:"",
    id_cliente:"",
    valor_reserva:"",
    descuento:"",
    idUsuario:"",
    fecha_inicio:"",
    fecha_fin:""
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
          id_cabana:"",
          id_cliente:"",
          valor_reserva:"",
          descuento:"",
          idUsuario:"",
          fecha_inicio:"",
          fecha_fin:""
        };
        this.redirect();
        console.log(resp.id_reserva);
        console.log(resp.descuento);
      }
    );
  }
}
