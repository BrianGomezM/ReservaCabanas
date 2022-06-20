import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reservas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url: string ="http://localhost/proyect2/Reservas.php";
  constructor(private http: HttpClient) { }

  crearpreReserva(reserva:Reserva){
    return this.http.post<Reserva>(this.url, JSON.stringify(reserva));
  }
  listarReservas(semana:String[]){
    return this.http.get<Reserva[]>(this.url+"?semana="+semana[1]+"&anio="+semana[0]);
  }
}
