import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent implements OnInit {
  fecha = new Date();
 
  constructor() { }

  ngOnInit(): void {
  }


}
