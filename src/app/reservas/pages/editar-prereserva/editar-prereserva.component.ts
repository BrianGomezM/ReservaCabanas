import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessage } from 'app/alerta/alerta';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Cliente } from 'app/clientes/interfaces/clientes.interface';
import { Reserva } from 'app/reservas/interfaces/reservas.interfaces';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { switchMap, tap } from 'rxjs';

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
  prereserva:Reserva={
    id_reserva:"",
    id_cabana:null,
    id_cliente:null,
    estado:"",
    valor_reserva:0,
    descuento:0,
    idUsuario:"",
    fecha_inicio:"",
    fecha_fin:""
  }

  cabanas:Cabana[];
  alert: AlertMessage = new AlertMessage();
  
  constructor(private activateRoute: ActivatedRoute,private cabanaService: CabanasService,public router:Router, private reservasService:ReservasService) { }

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
      this.prereserva.id_cabana= resp[0].id_cabana[0];
      this.prereserva.id_cliente= resp[0].id_cliente[0];
      // this.prereserva.id_reserva = resp[0].id_reserva;
      // this.prereserva.descuento = resp[0].descuento;
      
      console.log(this.prereserva.id_cliente.apellido_cliente);
      console.log(this.prereserva.id_cliente.numero_documento);
      // console.log(resp[0].descuento);
    })
  }

  redirect(){
    this.router.navigate(["reservas"]);
  }

  editarReserva(){
    this.prereserva.descuento = Number(this.prereserva.descuento);
    this.prereserva.valor_reserva = Number(this.prereserva.valor_reserva);
    this.reservasService.actualizarprereserva(this.prereserva).subscribe(
      resp=>{
        console.log(resp);
        this.alert.notificacionExito("top", "right", 0, "SUCCESS:", "Prereserva actualizada");
      }
    )
  }
}
