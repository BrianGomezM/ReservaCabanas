import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url:string = "https://rentcabinsproyect.tk/control/Controlador_Clientes.php";

  constructor(private http:HttpClient) { }

  agregarCliente(cliente:Cliente){
    return this.http.post<Cliente>(this.url, JSON.stringify(cliente));
  }
  actualizarCliente(cliente:Cliente){
    return this.http.put<Cliente>(this.url, JSON.stringify(cliente));
  }
}
