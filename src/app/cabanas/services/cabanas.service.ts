import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabana } from '../interfaces/Cabana.interface';

@Injectable({
  providedIn: 'root'
})
export class CabanasService {
  url: string ="http://localhost/selecionar.php";

  constructor(private http: HttpClient) { }

  getCabanas():Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url);
    
  }
  cabañaPorNombre(varNombre):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?name="+ varNombre);
  }
  crearCabana(Cabana:Cabana){
    console.log(Cabana.estado_cabana);
    return this.http.post(this.url,JSON.stringify(Cabana));
  }
  cambiarEstadoCabana(Cabana:Cabana){
    return this.http.put(this.url,JSON.stringify(Cabana),{responseType: 'text'});
  }
}
