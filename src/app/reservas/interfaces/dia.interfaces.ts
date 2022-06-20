import { Reserva } from "../interfaces/reservas.interfaces";
export class Dia{
    nombre:string;
    fecha:Date;
    listaReservas:Reserva[];

    constructor(nombre:string,fecha:Date,lista:Reserva[]) {
        this.nombre=nombre;
        this.fecha=fecha;
        this.listaReservas=lista;
    }
}