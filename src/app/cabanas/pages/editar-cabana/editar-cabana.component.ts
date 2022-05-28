import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-editar-cabana',
  templateUrl: './editar-cabana.component.html',
  styleUrls: ['./editar-cabana.component.css']
})
export class EditarCabanaComponent implements OnInit {
  nombre:string;

  cabana: Cabana ={
     id_cabana:"",
     nombre_cabana:"",
     descripcion_cabana:"",
     capacidad_cabana: 0,
     valor_cabana:"",
     estado_cabana:1,
     visibilidad:true
  };

  constructor(private activateRoute: ActivatedRoute, private router: Router,private cabanaService:CabanasService) { }

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(({ id }) => this.cabanaService.cabanaPorId(id))
    )
    .subscribe( resp =>{
      this.cabana=resp[0];
    })
  }
  
  redirect(){
    this.router.navigate(['/cabanas']);
  }

  actualizarCabana(){
    this.cabana.capacidad_cabana = Number(this.cabana.capacidad_cabana);
    this.cabana.estado_cabana = Number(this.cabana.estado_cabana);

    this.cabanaService.actualizarCabana(this.cabana).subscribe(
      resp=>{
        console.log('',resp);
        this.redirect();
      },
      err=>{
        console.log("error al guardar",err);
      }
    )
  }

}
