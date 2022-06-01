import { Component,EventEmitter, OnInit,Output } from '@angular/core';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { Imagen } from 'app/cabanas/interfaces/imagenes.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cabana',
  templateUrl: './crear-cabana.component.html',
  styleUrls: ['./crear-cabana.component.css']
})
export class CrearCabanaComponent implements OnInit {
  nombre:string;
  fileToUpload : Imagen[]= [];
  imagenes : any[] = [];
  imgURL: any;
  imagen: Imagen={
    id_imagen:"",
    nombre_imagen:"",
    url_imagen:""
  }
  cabana:Cabana={
  id_cabana:"",
  nombre_cabana:"",
  descripcion_cabana:"",
  capacidad_cabana:0,
  valor_cabana:"",
  estado_cabana:1,
  visibilidad:true
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
    this.cabanaService.crearCabana(this.cabana).subscribe(
      resp=>{
      this.cabana={
        id_cabana:"",
        nombre_cabana:"",
        descripcion_cabana:"",
        capacidad_cabana:0,
        valor_cabana:"",
        estado_cabana:1,
        visibilidad:true
      }
      this.redirect();
      console.log(resp);
      this.onCrear.emit();
    })
  }
  cargarImagenes(file:FileList){
    for(let i=0; i<file.length;i++){
      //reader.onload = ; // Renderizamos la imagen
      let reader = new FileReader();
     
      reader.onloadend = () => {
        this.imagenes.push(file.item(i));
        this.imagen={
          id_imagen:"",
          nombre_imagen:file.item(i).name,
          url_imagen:reader.result as string
        };
        this.fileToUpload.push(this.imagen);
      }
      reader.readAsDataURL(file.item(i));
      console.log(reader.result);
    }
  }
  
  subirImagenes(file:FileList){
    let nombre = "prueba2";
    for(let i=0; i<file.length; i++){
      let reader = new FileReader();
      reader.readAsDataURL(file.item(0));
      reader.onloadend = () => {
        this.imagenes.push(reader.result);
        this.cabanaService.subirImagenes(nombre+"_"+Date.now(), reader.result).then(
          urlImagen =>{
            console.log(urlImagen);
          }
        );
      }
    }
   
    }
  }

 



