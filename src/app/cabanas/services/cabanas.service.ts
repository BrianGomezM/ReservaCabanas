import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Cabana[]>( this.url );
  }
}
