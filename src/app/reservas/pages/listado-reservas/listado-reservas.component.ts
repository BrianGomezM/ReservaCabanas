import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { weekNumber } from 'weeknumber';
import * as moment from 'moment';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent implements OnInit {
  fecha = new Date();
  numberWeek =  this.fecha.getFullYear()+"-W"+weekNumber(this.fecha);
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }
  editarReserva(){
    this.router.navigate(['/editar-reserva']);
  }
  imprimir(event:any){
    var datefin = new Date(event);
    console.log(datefin);
  }
  crearPrereserva(){
    this.router.navigate(['/crear-prereserva']);
  }
}
