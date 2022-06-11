import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import {AlertMessage} from '../../../alerta/alerta'
@Component({
  selector: 'app-editar-cabana',
  templateUrl: './editar-cabana.component.html',
  styleUrls: ['./editar-cabana.component.css']
})
export class EditarCabanaComponent implements OnInit {
  nombre:string;
  alerta:AlertMessage = new AlertMessage();
  cabana: Cabana ={
     id_cabana:"",
     nombre_cabana:"",
     descripcion_cabana:"",
     capacidad_cabana: 0,
     valor_cabana:"",
     estado_cabana:1,
     visibilidad:true
  };
   cabanaid:string;

  constructor(private activateRoute: ActivatedRoute, private router: Router,private cabanaService:CabanasService) { }

  ngOnInit(): void {
    

    this.activateRoute.params
    .pipe(
      switchMap(({ id }) => this.cabanaService.cabanaPorId(id))
     
    )
    .subscribe( resp =>{
      this.cabana=resp[0];
      this.cabanaid=this.cabana.id_cabana;
      console.log(this.cabanaid);
      
    })
    console.log(this.cabanaid)

  }
  
  redirect(){
    Swal.fire({
      title: '¿Estás seguro de cancelar el proceso?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'El proceso fue cancelado',
          text: "",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['/cabanas']);
      }
    })
  }

  actualizarCabana(){
    this.cabana.capacidad_cabana = Number(this.cabana.capacidad_cabana);
    this.cabana.estado_cabana = Number(this.cabana.estado_cabana);

    this.cabanaService.actualizarCabana(this.cabana).subscribe(
      resp=>{
        console.log('',resp);
        this.alerta.notificacionExito("top", "right", 0, "ÉXITO", "Se ha actualizado la cabaña: " + this.cabana.nombre_cabana + " Correctamente.");
        //this.alerta.error('La cabaña fue editada con exito','','success');
        this.router.navigate(['/cabanas']);
      },
      err=>{
        console.log("error al guardar",err);
      }
    )
  }

}
