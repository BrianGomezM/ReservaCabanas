import { Component, OnInit, Output } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../services/usuarios.servicios';
import { Usuario } from '../../usuarios/interfaces/usuario.interface';
import { AlertMessage } from '../../alerta/alerta';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  min=0;
  max=5;
  aler = new AlertMessage();
  public param: String="";
  public nocarga:boolean=true;
  public closeModal:string="";
  public usuarios:Array<Usuario> = [];
  public paginar:Array<Usuario> = [];
  @Output()  usuario:Usuario={
    idUsuario: 0,
    nombre: "",
    apellido: "",
    idRol: 0,
    tipoDocumento: 0,
    telefono: "",
    documento: "",
    correo: "",
    contrasena: "",
    fechaRegistro: "",
  }

  

  constructor(private router: Router, private route: ActivatedRoute, private UsuariosService:UsuariosService) {}
  
  ngOnInit(): void {
    this.min = 0;
    this.max= 5;
    this.UsuariosService.getUsuarios(this.param)
    .subscribe((usuario:any)=>{
      this.usuarios = usuario['respuesta'];
      this.paginar=this.usuarios.slice(this.min,this.max);
    }
      //usuario => this.usuarios = usuario
      ); 
    }
    //invoco el servicio
    eliminarUsuario(index){
       Swal.fire({
        title: "Esta seguro?",
        text: "Se borrara  de forma permanente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'El registro seleccionado fue eliminado correctamente.',
            'success') 
            this.UsuariosService.eliminarUsuario(index).subscribe(
              resp=>{
                this.ngOnInit();
             });
        }
      }); 
    }

    
    convertir(rol:string): string{
      var respuesta:string = "";
      switch(rol){
        case "1":          
          respuesta = "Administrador";
        break;
        case "2":
          respuesta = "Logistica";
        break;
        case "3":
          respuesta = "Auxiliar Contable";
        break;
        case "4":
          respuesta = "Encargado de reservas";
        break
        default:
          respuesta = "Error";
        break
      }return respuesta;

    }
    editar(index){  
      this.router.navigate(['usuario-editar',index]);
    }
    
    buscar(valor){   
      this.min = 0;
      this.max= 5;
        this.UsuariosService.getUsuarios(valor).subscribe((usuario:any)=>{
          if(this.usuarios = usuario['respuesta']){
            this.paginar=this.usuarios.slice(this.min,this.max);
            // TODO document why this block is empty
          }else{
            this.aler.error("Advertencia", "No hay usuarios registrados con el dato: "+valor, 'warning');   
          }
          });
      }
    
    crear(){ 
       this.router.navigate(['usuario-crear']);
    }

    next(minE, maxE){
       if(maxE != this.usuarios.length && maxE <= this.usuarios.length ){
            if((maxE+5)>this.usuarios.length){
              this.max = maxE=this.usuarios.length;
              this.min = minE + 5;
            }else{
                  this.max = maxE + 5;
                  this.min = minE + 5;
            }
            this.paginar=this.usuarios.slice(this.min,this.max);
       }
      }

    previous(minE, maxE){
      if(minE != 0){
        if((minE-5)<=0){
          this.max = 5;
          this.min = 0;
        }else{
              this.max = maxE - 5;
              this.min = minE - 5;
        }
        this.paginar=this.usuarios.slice(this.min,this.max);
   }
  }
}
