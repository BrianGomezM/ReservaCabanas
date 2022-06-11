import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabana } from '../interfaces/Cabana.interface';
import { Imagen } from '../interfaces/imagenes.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'environments/environment';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class CabanasService {
  url: string ="http://localhost/proyect2/Cabanas.php";
  url_imagen = "http://localhost/proyect2/Imagenes.php";
  storageRef = firebase.app().storage().ref();

  constructor(private http: HttpClient) { }

  getCabanas():Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url);
    
  }
  cabañaPorNombre(varNombre:String):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?name="+ varNombre );
  }
  cabanaPorId(id:String):Observable<Cabana[]>{
    return this.http.get<Cabana[]>( this.url + "?id="+ id );
  }

  crearCabana(Cabana:Cabana){
    return this.http.post<Cabana>(this.url + "?op="+0,JSON.stringify(Cabana));
  }
  cambiarEstadoCabana(Cabana:Cabana){
    return this.http.put(this.url,JSON.stringify(Cabana));
  }
  actualizarCabana(cabana:Cabana){
    return this.http.put(this.url,JSON.stringify(cabana));
  }
  eliminarCabana(cabana:Cabana){

    return this.http.post(this.url + "?op="+1, JSON.stringify(cabana));
  }
  async subirImagenes(nombre:string, img:any){
    try{
      let response = await this.storageRef.child("/cabana" + nombre).putString(img,'data_url');
      return response.ref.getDownloadURL();
    }catch(err){
      console.log(err);
    }
  }
  agregarImagenes(imagen : Imagen){
    return this.http.post<Imagen>(this.url_imagen, JSON.stringify(imagen));
  }

  listarImagenes(id : string):Observable<Imagen[]>{
    return this.http.get<Imagen[]>(this.url_imagen+"?id="+id);  
  }
}
