import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { ClientesService } from 'app/clientes/services/clientes.service';
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
  cabanas:Cabana[];
  total_descuento:number = 0;

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
      this.reserva.id_cabana= resp[0].id_cabana[0];
      this.reserva.id_cliente= resp[0].id_cliente[0];
      this.calculaTotalDescuento();
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
    this.actualizarCliente();
    this.reservasService.actualizarprereserva(this.reserva).subscribe(
      resp=>{
        console.log(resp);
      }
    );
  }
  calculaTotalDescuento(){
    //calcula el total de la reserva con descuento
    var valor_noche = this.reserva.valor_reserva;
    var descuento = Number(this.reserva.descuento);
    var total = valor_noche - descuento;
    this.total_descuento = total;
   
  }

}
