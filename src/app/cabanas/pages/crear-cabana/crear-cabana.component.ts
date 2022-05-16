import { Component,EventEmitter, OnInit,Output } from '@angular/core';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-cabana',
  templateUrl: './crear-cabana.component.html',
  styleUrls: ['./crear-cabana.component.css']
})
export class CrearCabanaComponent implements OnInit {
  nombre:string;

  cabana:Cabana={
  id_cabana:"",
  nombre_cabana:"",
  descripcion_cabana:"",
  capacidad_cabana:"",
  valor_cabana:""
  };
  @Output() onCrear: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,private cabanaService:CabanasService) { }

  ngOnInit(): void {
  }
  

  redirect(){
    this.router.navigate(['/cabanas']);
  }
  crearCabana(){
    console.log(this.cabana.nombre_cabana);
    this.cabanaService.crearCabana(this.cabana).subscribe(resp=>{
      this.cabana={
        id_cabana:"",
        nombre_cabana:"",
        descripcion_cabana:"",
        capacidad_cabana:"",
        valor_cabana:""
      }
      this.redirect();
      console.log(resp);
      this.onCrear.emit();
    })
  }
}
