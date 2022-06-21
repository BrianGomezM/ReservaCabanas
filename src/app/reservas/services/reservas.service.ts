import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { Abono } from 'app/contable/abonos/interfaces/abono.interface';
import { Reserva } from '../interfaces/reservas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  url: string ="https://rentcabinsproyect.tk/control/Controlador_Reservas.php";
  url_abonos: string = "https://rentcabinsproyect.tk/control/Controlador_Abono_Datos.php";

  constructor(private http: HttpClient) { }

  crearpreReserva(reserva:Reserva){
    return this.http.post<Reserva>(this.url, JSON.stringify(reserva));
  }
  listadoDisponibles(reserva:Reserva){
    return this.http.get<Reserva[]>(this.url+"?fecha_inicio="+reserva.fecha_inicio+"&fecha_fin="+reserva.fecha_fin);
  }
  verificarDisponibilidad(reserva:Reserva){
    return this.http.get<Cabana[]>(this.url+"?fecha_inicio="+reserva.fecha_inicio+"&fecha_fin="+reserva.fecha_fin+"&id_cabana="+reserva.id_cabana[0].id_cabana);
  }
  reservaId(id:string){
    return this.http.get<Reserva>(this.url+"?id="+id);
  }
  actualizarprereserva(reserva:Reserva){
    return this.http.put(this.url, JSON.stringify(reserva));
  }
  listarReservas(semana:String[]){
    return this.http.get<Reserva[]>(this.url+"?semana="+semana[1]+"&anio="+semana[0]);
  }
  listarAbonosReserva(reserva:Reserva){
    return this.http.get<Abono[]>(this.url_abonos+"?codReserva="+reserva.id_reserva);
  }
}
