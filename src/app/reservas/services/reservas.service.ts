import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
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
  verificarDisponibilidad(reserva:Reserva){
    return this.http.get<Cabana[]>(this.url+"?fecha_inicio="+reserva.fecha_inicio+"&fecha_fin="+reserva.fecha_fin);
  }
}
