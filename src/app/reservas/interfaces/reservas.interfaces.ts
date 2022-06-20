import { Cabana } from "app/cabanas/interfaces/Cabana.interface";
import { Cliente } from "app/clientes/interfaces/clientes.interface";

export interface Reserva{
    id_reserva:string;
    id_cabana:Cabana;
    id_cliente:Cliente;
    valor_reserva:number;
    descuento:number;
    estado:string;
    idUsuario:string;
    fecha_inicio:string;
    fecha_fin:string;
    id_plan:string;
}