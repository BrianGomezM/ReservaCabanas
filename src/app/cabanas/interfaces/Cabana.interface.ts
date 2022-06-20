import { Imagen } from '../interfaces/imagenes.interface';
export interface Cabana {
    id_cabana:          string;
    nombre_cabana:      string;
    descripcion_cabana: string;
    capacidad_cabana:   number;
    valor_cabana:       string;
    estado_cabana:      number;
    visibilidad: boolean;
    imagenesList: Imagen[];
}