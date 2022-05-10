import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  guardar(){
    this.router.navigate(['usuario-listar']);
  }
}
