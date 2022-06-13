import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-prereserva',
  templateUrl: './crear-prereserva.component.html',
  styleUrls: ['./crear-prereserva.component.css']
})
export class CrearPrereservaComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    
  }
  redirect(){
    this.router.navigate(["reservas"]);
  }
}
