export interface Usuario{
    idUsuario?: number;
    nombre: string;
    apellido: string;
    idRol: number;
    tipoDocumento: number;
    documento?: number|string;
    telefono: number|string;
    correo: string;
    contrasena: string;
    fechaRegistro:string;
}

