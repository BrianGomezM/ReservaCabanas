import { Cabana } from "app/cabanas/interfaces/Cabana.interface";
import { Cliente } from "app/clientes/interfaces/clientes.interface";

export interface Reserva{
    id_reserva:string;
    id_cabana:Cabana[];
    id_cliente:Cliente[];
    valor_reserva:number;
    descuento:number;
    idUsuario:string;
    fecha_inicio:Date;
    fecha_fin:Date;
    estado:string;
    id_plan:string;
}