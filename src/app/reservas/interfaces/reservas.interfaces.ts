import { Cabana } from "app/cabanas/interfaces/Cabana.interface";
import { Cliente } from "../interfaces/clientes.interface";
export interface Reserva{
    id_reserva:string;
    id_cabana:Cabana[];
    id_cliente:Cliente[];
    valor_reserva:string;
    descuento:string;
    idUsuario:string;
    fecha_inicio:Date;
    fecha_fin:Date;
    estado:string;
}