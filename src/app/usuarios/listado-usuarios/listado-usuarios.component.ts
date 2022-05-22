import { Component, OnInit, Output } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../services/usuarios.servicios';
import { Usuario } from '../../usuarios/interfaces/usuario.interface';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

 

  public param: String="";
  public nocarga:boolean=true;
  public closeModal:string="";
  public usuarios:Array<Usuario> = [];

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
    this.UsuariosService.getUsuarios(this.param)
    .subscribe((usuario:any)=>{
      this.usuarios = usuario['0'];
    }
      //usuario => this.usuarios = usuario
      );}
    //invoco el servicio
    eliminarUsuario(index:string){
      this.UsuariosService.eliminarUsuario(index).subscribe(
        resp=>{this.ngOnInit();
       }); 
    }

    editar(index: number){
      index=this.usuarios[index]['idUsuario'];
      this.router.navigate(['usuario-editar',index]);
    }
    
    buscar(){
        this.UsuariosService.getUsuarios(this.param).subscribe((usuario:any)=>{
        this.usuarios = usuario['0'];
        });
        
    }
    crear(){ 
       this.router.navigate(['usuario-crear']);
    }
}
