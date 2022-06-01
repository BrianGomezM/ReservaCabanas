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

  getUsuarios(param:String){
    let  url ='http://localhost/Usuarios.php?param='+param;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Usuario[]>(url,{headers:header});
  }

  eliminarUsuario(usuario:string): Observable<any>{
    //defino la url donde esta el servicio
    let  url ='http://localhost/Usuarios.php?opcion='+1+'&idUsuario='+usuario;
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
  //  header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.get<any>(url,{headers:header});
  }
  getUsuarioID(param:number){
    let  url ='http://localhost/Usuarios.php?param1='+param;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Usuario[]>(url,{headers:header});
  }
  editarUsuario(usuario:Usuario){
    //defino la url donde esta el servicio
    let  url ='http://localhost/Usuarios.php?opcion='+1;
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
    //header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.post(url,JSON.stringify(usuario),{headers:header});
  } 
  crearUsuario(usuario:Usuario){
    //defino la url donde esta el servicio
    let  url ='http://localhost/Usuarios.php?opcion='+2;
       let header=new HttpHeaders();
       header.append('Content-Type','aplication/json')
      // header.append('Access-Control-Allow-Methods','"POST, GET"')
       header.append('Access-Control-Allow-Origin','http://localhost');
       return this.http.post(url,JSON.stringify(usuario),{headers:header});
 }

 getSesionUser(email:string,password:string ){
  let  url ='http://localhost/?control=1&correo='+email+'&clave='+password;
      let header=new HttpHeaders();
      header.append('Content-Type','aplication/json')
     //header.append('Access-Control-Allow-Methods','"POST, GET"')
      header.append('Access-Control-Allow-Origin','http://localhost');
      return this.http.get<Usuario[]>(url,{headers:header});
}
getOlvidoC(correo:string){
  let  url ='http://localhost/';
  let header=new HttpHeaders();
  header.append('Content-Type','aplication/json')
  //header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
  header.append('Access-Control-Allow-Origin','http://localhost');
  return this.http.post(url,JSON.stringify(correo),{headers:header});
} 
}
