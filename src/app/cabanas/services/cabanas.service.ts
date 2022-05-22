import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabana } from '../interfaces/Cabana.interface';

@Injectable({
  providedIn: 'root'
})
export class CabanasService {
  url: string ="URL DEL SERVICIO";

  constructor(private http: HttpClient) { }

  getCabanas():Observable<Cabana[]>{
    console.log(this.url);
    console.log("Hola" + this.url);
    return this.http.get<Cabana[]>( this.url );
    
  }
  cabañaPorNombre(varNombre:String):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?name="+ varNombre );
  }
  cabanaPorId(id:String):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?id="+ id );
  }

  crearCabana(Cabana:Cabana){
    return this.http.post(this.url,JSON.stringify(Cabana));
  }
  actualizarCabana(cabana:Cabana){
    return this.http.put(this.url,JSON.stringify(cabana));
  }
}
