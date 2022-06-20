export interface Abono{
    idAbono?: number;
    fechaRegistro?: Date|string;
    valorAbonado: string;
    observacion: string;
    banco: number;
    codPago: number;
    idReserva: number|string;
    fechaPago: Date|string;
    usuario?:string|number;
    cliente?:string;
    estadoReserva:number|string;
}
