import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService{

  private baseUrl:string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  
  getSesionUser(email:string,password:string ){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Inicio_Sesion.php?correo='+email+'&clave='+password;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Usuario[]>(url,{headers:header});
  }
  getOlvidoC(correo:string){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Inicio_Sesion.php';
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
    //header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.post(url,JSON.stringify(correo),{headers:header});
  }



  getUsuarios(param:String){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php?param='+param;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Usuario[]>(url,{headers:header});
  }

  eliminarUsuario(usuario): Observable<any>{
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php?idUsuario='+usuario;
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
  //  header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.delete<any>(url,{headers:header});
  }
  getUsuarioID(param:number){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php?param1='+param;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Usuario[]>(url,{headers:header});
  }
  editarUsuario(usuario:Usuario){
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php';
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
    //header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.put(url,JSON.stringify(usuario),{headers:header});
  } 
  crearUsuario(usuario:Usuario){
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php';
       let header=new HttpHeaders();
       header.append('Content-Type','aplication/json')
      // header.append('Access-Control-Allow-Methods','"POST, GET"')
       header.append('Access-Control-Allow-Origin','http://localhost');
       return this.http.post(url,JSON.stringify(usuario),{headers:header});
 }

 

validarDC(dato:string|number){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Usuarios.php?param2='+dato;
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
  //header.append('Access-Control-Allow-Methods','"POST, GET"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.get<Usuario[]>(url,{headers:header});
  } 
}
