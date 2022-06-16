import { Component,EventEmitter, OnInit,Output } from '@angular/core';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { Imagen } from 'app/cabanas/interfaces/imagenes.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-crear-cabana',
  templateUrl: './crear-cabana.component.html',
  styleUrls: ['./crear-cabana.component.css']
})
export class CrearCabanaComponent implements OnInit {
  nombre:string;
  fileToUpload : Imagen[]= [];
  //imagenes : any[] = [];
  //imgURL: any;
  imagen: Imagen={
    id_imagen:"",
    nombre_imagen:"",
    url_imagen:"",
    id_cabana:""
  }
  cabana:Cabana={
  id_cabana:"",
  nombre_cabana:"",
  descripcion_cabana:"",
  capacidad_cabana:1,
  valor_cabana:"",
  estado_cabana:1,
  visibilidad:true,
  imagenesList:null
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
      resp => {
        this.cabana = {
          id_cabana: "",
          nombre_cabana: "",
          descripcion_cabana: "",
          capacidad_cabana: 0,
          valor_cabana: "",
          estado_cabana: 1,
          visibilidad: true,
          imagenesList:null
        };
        console.log("----" + resp.id_cabana);
        this.subirImagenes(resp.id_cabana);
        console.log("CABAÑA CREADA: " + resp.id_cabana);
        this.onCrear.emit();
      })
  }
  typeValidate(file:File){
     let varResultado:Boolean=false;
    if(file.type == "image/png" || file.type == "image/jpg"){
        varResultado=true;
    }
    return varResultado;
  }

  deleteImage(i:number){
    this.fileToUpload.splice(i,1);
    //this.imagenes.splice(i,1);
  }

  cargarImagenes(file:FileList){
    for(let i=0; i<file.length;i++){
      if(this.typeValidate(file.item(i))){
        //reader.onload = ; // Renderizamos la imagen
        let reader = new FileReader();
      
        reader.onloadend = () => {
          this.imagen={
            id_imagen:"",
            id_cabana:"",
            nombre_imagen:file.item(i).name,
            url_imagen:reader.result as string
          };
          this.fileToUpload.push(this.imagen);
        }
        reader.readAsDataURL(file.item(i));
      }else{
        this.showNotification("top", "right", 1, "ERROR:", "solo se admiten archivos en formatos de imagen (.PNG  y .JPG)");
        
      }
    }
  }
  
  async subirImagenes(id_cabana:string){
    let nombre = "prueba2";
    var tmpImagenes = this.fileToUpload.length;
    for(let i=0; i<tmpImagenes; i++){
      // let reader = new FileReader();
      // reader.readAsDataURL(file.item(0));
      // reader.onloadend = () => {
      //   this.imagenes.push(reader.result);
      //   this.cabanaService.subirImagenes(nombre+"_"+Date.now(), reader.result).then(
      //     urlImagen =>{
      //       console.log(urlImagen);
      //     }
      //   );
      // }
      await this.cabanaService.subirImagenes(this.fileToUpload[i].nombre_imagen+"_"+Date.now(), this.fileToUpload[i].url_imagen, id_cabana).then(
           urlImagen =>{
            this.fileToUpload[i].url_imagen = urlImagen;
            this.fileToUpload[i].id_cabana = id_cabana;
            console.log(urlImagen, this.fileToUpload[i]);
      });
      
      this.cabanaService.agregarImagenes(this.fileToUpload[i]).subscribe(
        resp=>{
          console.log(resp);
          this.redirect();
          this.showNotification("top", "right", 0, "SUCCESS:", "Se ha creado la cabaña correctamente");
        }
      );

    }
    
   
  }

    showNotification(from, align, opcion, titulo, mesanje){
      const type = ['success','danger'];
      const color = opcion;
      $.notify({
          icon: titulo,
          message: mesanje
      },{
          type: type[color],
          timer: 2000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  }

 



