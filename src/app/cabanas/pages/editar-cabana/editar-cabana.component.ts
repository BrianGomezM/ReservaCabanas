import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { Imagen } from 'app/cabanas/interfaces/imagenes.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import {AlertMessage} from '../../../alerta/alerta';

@Component({
  selector: 'app-editar-cabana',
  templateUrl: './editar-cabana.component.html',
  styleUrls: ['./editar-cabana.component.css']
})

export class EditarCabanaComponent implements OnInit {
  nombre:string;
  alerta:AlertMessage = new AlertMessage();

  imagen: Imagen={
    id_imagen:"",
    nombre_imagen:"",
    url_imagen:"",
    id_cabana:""
  }
  imagenes:Imagen[]=[];
  imagenesEliminar:Imagen[]=[];
  imagenesGuardar:Imagen[]=[];
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
      this.cabanaService.listarImagenes(this.cabana.id_cabana).subscribe(resp=>{
          this.imagenes=resp;                      
      })
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

  deleteImage(indice:number){
    //toma la imagenes que el usuario quiere eliminar y las pone en un arreglo temporal
    var imgEliminar:Imagen = this.imagenes[indice];
    
    if(imgEliminar.id_cabana!=""){
      this.imagenesEliminar.push(imgEliminar);
      this.imagenes.splice(indice,1);
    }else{
      this.imagenesGuardar.splice(indice,1);
      this.imagenes.splice(indice,1);
    }
    for(var i =0; i<this.imagenesGuardar.length;i++){
      console.log('imagen a guardar --- '+this.imagenesGuardar[indice].nombre_imagen +'+');
    }
    console.log('imagen a eliminar --- '+imgEliminar.nombre_imagen +'+');

  }

  typeValidate(file:File){
    let varResultado:Boolean=false;
   if(file.type == "image/png" || file.type == "image/jpg"){
       varResultado=true;
   }
   return varResultado;
  }

  cargarImagenes(file:FileList){
    //carga las imagenes que se van agregando a un arreglo llamado imagenes guardar para su posterior inserción en la db
    for(let i=0; i<file.length;i++){
      if(this.typeValidate(file.item(i))){
        
        let reader = new FileReader();
        //lee la imagen y la guarda en el objeto de imagen
        reader.onloadend = () => {
          this.imagen={
            id_imagen:"",
            id_cabana:"",
            nombre_imagen:file.item(i).name,
            url_imagen:reader.result as string
          };
          this.imagenesGuardar.push(this.imagen);
          this.imagenes.push(this.imagen);
        }
        reader.readAsDataURL(file.item(i));//lee la imagen de tal manera que permita la previsualización
      }else{
        this.alerta.notificacionExito("top", "right", 1, "ERROR:", "solo se admiten archivos en formatos de imagen (.PNG  y .JPG)");        
      }
    }
  }

  actualizarCabana(){
    this.cabana.capacidad_cabana = Number(this.cabana.capacidad_cabana);
    this.cabana.estado_cabana = Number(this.cabana.estado_cabana);

    this.cabanaService.actualizarCabana(this.cabana).subscribe(
      resp=>{
        console.log('',resp);
        this.subirImagenes(this.cabana.id_cabana);
        this.alerta.notificacionExito("top", "right", 0, "ÉXITO", "Se ha actualizado la cabaña: " + this.cabana.nombre_cabana + " Correctamente.");
        this.router.navigate(['/cabanas']);
      },
      err=>{
        console.log("error al guardar",err);
      }
    )
  }

  async subirImagenes(id_cabana:string){
    // Guarda la imagen en el storage y en la base de datos
    var tmpImagenes = this.imagenesGuardar.length;
    for(let i=0; i<tmpImagenes; i++){
      await this.cabanaService.subirImagenes(this.imagenesGuardar[i].nombre_imagen+"_"+Date.now(), this.imagenesGuardar[i].url_imagen).then(
           urlImagen =>{
            this.imagenesGuardar[i].url_imagen = urlImagen;
            this.imagenesGuardar[i].id_cabana = id_cabana;
            console.log(urlImagen, this.imagenesGuardar[i]+"aa");
      });
      
      this.cabanaService.agregarImagenes(this.imagenesGuardar[i]).subscribe(
        resp=>{
          console.log(resp);
          this.router.navigate(['/cabanas']);
          this.alerta.notificacionExito("top", "right", 0, "SUCCESS:", "Se ha actualizado la cabaña correctamente");
        }
      );

    }
    
  }

  async eliminarImagenes(){
    var tmpImagenes = this.imagenesEliminar.length;
    for(let i=0; i<tmpImagenes; i++){

    }
    
  }


}
