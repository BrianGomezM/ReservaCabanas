import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Abono } from '../interfaces/abono.interface';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AbonoService{

  private baseUrl:string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }
  
  getAbonos(){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php';
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Abono[]>(url,{headers:header});
  }

  buscarDatosReservaxBono(){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono_Datos.php';
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Abono[]>(url,{headers:header});
  }

  buscarAbonoxNombreCU(param){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php?param='+param;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Abono[]>(url,{headers:header});
  }

  buscarAbonoID(param3){
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php?param3='+param3;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Abono[]>(url,{headers:header});
  }

  buscarAbonoxfecha(param1, param2){   
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php?param1='+param1+"&param2="+param2;
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
       //header.append('Access-Control-Allow-Methods','"POST, GET"')
        header.append('Access-Control-Allow-Origin','http://localhost');
        return this.http.get<Abono[]>(url,{headers:header});
  }

  eliminarAbono(Idabono): Observable<any>{
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php?idAbono='+Idabono;
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
  //  header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.delete<any>(url,{headers:header});
  }


  editarAbono(abono:Abono){
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php';
    let header=new HttpHeaders();
    header.append('Content-Type','aplication/json')
    //header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
    header.append('Access-Control-Allow-Origin','http://localhost');
    return this.http.put(url,JSON.stringify(abono),{headers:header});
  } 

  crearAbono(abono:Abono){
    //defino la url donde esta el servicio
    let  url ='https://rentcabinsproyect.tk/control/Controlador_Abono.php';
       let header=new HttpHeaders();
       header.append('Content-Type','aplication/json')
      // header.append('Access-Control-Allow-Methods','"POST, GET"')
       header.append('Access-Control-Allow-Origin','http://localhost');
       return this.http.post(url,JSON.stringify(abono),{headers:header});
 }


}
