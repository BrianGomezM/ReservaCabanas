import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';

@Component({
  selector: 'app-editar-cabana',
  templateUrl: './editar-cabana.component.html',
  styleUrls: ['./editar-cabana.component.css']
})
export class EditarCabanaComponent implements OnInit {
  nombre:string;
  @Output() cabanas: Cabana[] = [];
  cabana:Cabana={
     id_cabana:"",
     nombre_cabana:"",
     descripcion_cabana:"",
     capacidad_cabana:"",
     valor_cabana:"",
     estado:1
  };

  constructor(private router: Router,private cabanaService:CabanasService) { }

  ngOnInit(): void {
  }
  
  redirect(){
    this.router.navigate(['/cabanas']);
  }

  actualizarCabana(){
    this.cabanaService.actualizarCabana(this.cabana).subscribe(
      resp=>{
        console.log(resp);
        this.redirect();
      }
    )
  }

}
