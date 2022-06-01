import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabana } from '../interfaces/Cabana.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'environments/environment';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class CabanasService {
  url: string ="http://localhost/Cabanas.php";
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
    return this.http.post(this.url + "?op="+0,JSON.stringify(Cabana));
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
}
