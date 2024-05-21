import { Component, OnInit } from '@angular/core';
import { FormularioC } from './interface/reservas.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioServices } from './services/formulario.services';
import { AlertMessage } from 'app/alerta/alerta';

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.css']
})
export class FormularioReservaComponent implements OnInit {
  numberWeek="";
  public datosclientes:Array<FormularioC> = [];
  constructor(private route: ActivatedRoute, private router: Router,private forumarioS:FormularioServices) { }
  datoscliente: FormularioC={
    id_cliente: 0,
    nombre_cliente: "",
    apellido_cliente: "",
    tipo_documento:  "",
    telefono_cliente:  "",
    telefono2_cliente:  "",
    correo_cliente: "",
    numero_documento: "",
}
    aler = new AlertMessage();


  ngOnInit(): void {
    this.datoscliente.id_cliente = this.route.params['_value']['id'];
    this.forumarioS.obtenerF(this.datoscliente.id_cliente)
    .subscribe((respuesta:any)=>{    
      if(respuesta['status']!=400){
        this.datoscliente = respuesta['respuesta'][0];    
      }else{
        this.aler.notificacionExito("bottom","center",1,"warning","No puedes ingresar aquí");
        this.router.navigate(['']);
      } 
      
    }); 
  }
  imprimir(event){}

  crearFormulario(){    
    this.forumarioS.editarFormulario(this.datoscliente).subscribe(respuesta=>{
      if(respuesta['status']==200){
        this.aler.correcto("Bien", "Registro exitoso");  
        this.router.navigate(['']);
      }else{
        this.aler.error("Error", "No se creo el registro en el sistema", 'error');
      }
   });

  }
}
