import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabana } from '../interfaces/Cabana.interface';

@Injectable({
  providedIn: 'root'
})
export class CabanasService {
  url: string ="http://localhost/proyect2/selecionar.php";

  constructor(private http: HttpClient) { }

  getCabanas():Observable<Cabana[]>{
    console.log(this.url);
    console.log("Hola" + this.url);
    return this.http.get<Cabana[]>( this.url );
    
  }
  cabañaPorNombre(varNombre):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?name="+ varNombre );
  }
  crearCabana(Cabana:Cabana){
    console.log(Cabana.estado_cabana);
    return this.http.post(this.url,JSON.stringify(Cabana));
  }
}
