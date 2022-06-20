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
  listadoDisponibles(reserva:Reserva){
    return this.http.get<Reserva[]>(this.url+"?fecha_inicio="+reserva.fecha_inicio+"&fecha_fin="+reserva.fecha_fin);
  }
  verificarDisponibilidad(reserva:Reserva){
    return this.http.get<Cabana[]>(this.url+"?fecha_inicio="+reserva.fecha_inicio+"&fecha_fin="+reserva.fecha_fin+"&id_cabana="+reserva.id_cabana.id_cabana);
  }
  reservaId(id:string){
    return this.http.get<Reserva>(this.url+"?id="+id);
  }
  actualizarprereserva(reserva:Reserva){
    
    return this.http.put(this.url, JSON.stringify(reserva));
  }
}
