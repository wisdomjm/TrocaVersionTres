import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizaProductoService {

  private apiKey = environment.mapToken;
  public userLocation?:[number, number];
  latM: any; //= 43.1746;
  lngM: any; //= -2.4125;
  usersLocations: any;

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor(
    private geolocation: Geolocation,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private http: HttpClient
  ) { }

  public async getUserLocation(): Promise<[number, number]>{
    return new Promise((resolve, reject) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude]; 
          resolve(this.userLocation);
          console.log()
        },
        (err) =>{
          console.log('No se obtuvo la geolocalizacion: ',err);
          reject();
        }
      );
    })
  }

  //ENVIAR POSICION DEL USUARIO
  async sendLocation() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {

        let Options = {
          enableHighAccuracy:true,
        }
        
        const coordinates = await Geolocation.getCurrentPosition(Options);
      
        //console.log('Current position:', coordinates);
        this.latM = coordinates.coords.latitude;
        this.lngM = coordinates.coords.longitude;
    
        this.afDatabase.object(`posicionUsuarios/${user.uid}`).set({
          latitud: this.latM,
          longitud: this.lngM
        });
      }
    } catch (error) {
      console.error('Error al enviar la ubicación:', error);
    }
  }

  getLocation(){

    return this.afDatabase.list('posicionUsuarios').valueChanges();
    //console.log("Las posiciones de todos los usuarios son:", this.usersLocations);
    //return this.usersLocations;

  }

  geocodeAddress(address: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${this.apiKey}`;
    console.log("URLS: ",url);
    return this.http.get(url);
  }

}
