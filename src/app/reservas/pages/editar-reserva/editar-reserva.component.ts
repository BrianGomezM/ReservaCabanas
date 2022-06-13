import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(["reservas"]);
  }

}
