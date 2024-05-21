import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { FormularioC } from '../interface/reservas.interfaces';


@Injectable({
  providedIn: 'root'
})
export class FormularioServices{

  private baseUrl:string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  
  
  editarFormulario(formularioR:FormularioC){
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Formulario.php';
       let header=new HttpHeaders();
       header.append('Content-Type','aplication/json')
      // header.append('Access-Control-Allow-Methods','"POST, GET"')
       header.append('Access-Control-Allow-Origin','http://localhost');
       return this.http.put(url,JSON.stringify(formularioR),{headers:header});
 }


   
 obtenerF(param){
  let  url ='https://rentcabinsproyect.tk/control/Controlador_Formulario.php?param='+param;
      let header=new HttpHeaders();
      header.append('Content-Type','aplication/json')
     //header.append('Access-Control-Allow-Methods','"POST, GET"')
      header.append('Access-Control-Allow-Origin','http://localhost');
      return this.http.get<FormularioC[]>(url,{headers:header});
}


}
