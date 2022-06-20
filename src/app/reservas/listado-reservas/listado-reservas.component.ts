import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.scss']
})
export class ListadoReservasComponent implements OnInit {
  fecha = new Date();
 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  abono(){
    var index = 20;
    this.router.navigate(['reserva-abonos-crear',index]);
  }

}
