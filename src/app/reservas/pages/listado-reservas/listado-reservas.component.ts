import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from 'app/reservas/services/reservas.service';
import { weekNumber } from 'weeknumber';
import { Reserva} from "app/reservas/interfaces/reservas.interfaces"
import { Cabana } from "app/cabanas/interfaces/Cabana.interface"
import { Dia } from 'app/reservas/interfaces/dia.interfaces';
import { ContableModule } from 'app/contable/contable.module';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent implements OnInit {
  fecha = new Date();
  numberWeek =  this.fecha.getFullYear()+"-W"+weekNumber(this.fecha);
  constructor(private router: Router, private reservasService:ReservasService) { }
  listaReservas:Reserva[]=[];
  arraySemana:Date[]=[];
  seleccion:string="todo";
  contadorReservas:number=0;
  diasSemana:Dia[]=
  [
    new Dia("Lunes",null,[]),
    new Dia("Martes",null,[]),
    new Dia("Miercoles",null,[]),
    new Dia("Jueves",null,[]),
    new Dia("Viernes",null,[]),
    new Dia("Sabado",null,[]),
    new Dia("Domingo",null,[]),
  ]
  ;

  ngOnInit(): void {
    this.main();
  }

  main(){
    this.getListReservations();
  }

 obtenerDia(fecha:string){
    var fechaArray:string[]=fecha.split("-",3);
    var fechaDate:Date= new Date(parseInt(fechaArray[0]),parseInt(fechaArray[1])-1,parseInt(fechaArray[2]));
    return fechaDate.getDay();
}
async getListReservations(){
  var semana:String[]=this.numberWeek.split("-W",2);
   await this.reservasService.listarReservas(semana).subscribe(resp => {
    this.listaReservas=resp;
    this.organizarDias();
 })
}
  cargarFechas(){ //Permite asignar a cada dia la fecha especificada por el Backend.
    for(let i=0; i <7;i++){
      this.diasSemana[i].fecha=this.listaReservas[this.listaReservas.length-1][i];
    }
  }
  classifyReservation(reserva:Reserva){
    for(let i=0; i<this.diasSemana.length;i++){
       if(this.diasSemana[i].fecha >= reserva.fecha_inicio && this.diasSemana[i].fecha <= reserva.fecha_fin){
         this.diasSemana[i].listaReservas.push(reserva);
       }
    }
    
  }
  async organizarDias(){
    this.contadorReservas=0;
    this.diasSemana=
    [
      new Dia("Lunes",null,[]),
      new Dia("Martes",null,[]),
      new Dia("Miercoles",null,[]),
      new Dia("Jueves",null,[]),
      new Dia("Viernes",null,[]),
      new Dia("Sabado",null,[]),
      new Dia("Domingo",null,[]),
    ];
    this.cargarFechas();
    for(let i=0; i< this.listaReservas.length-1;i++){
      if(this.seleccion == "todo"){
        this.classifyReservation(this.listaReservas[i]);
        this.contadorReservas+=1;
      }else{
        if(this.seleccion == "3" && this.listaReservas[i].estado=="3"){
          this.classifyReservation(this.listaReservas[i]);
          this.contadorReservas+=1;
        } if(this.seleccion == "4" && this.listaReservas[i].estado=="4"){
          this.classifyReservation(this.listaReservas[i]);
          this.contadorReservas+=1;
        }
      }

    }
  }
  editarReserva(id:string){
    this.router.navigate(['/editar-reserva',id]);
  }
  editarPreserva(id:string){
    this.router.navigate(['/editar-prereserva',id]);
  }

  crearPrereserva(){
    this.router.navigate(['/crear-prereserva']);
  }
  link(){
    this.router.navigate(['/formularioC/123']);
  }
}
