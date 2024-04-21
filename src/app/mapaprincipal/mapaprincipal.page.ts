import { Component, OnInit, NgZone,AfterViewInit, ViewChild, ElementRef   } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { LocalizaProductoService } from '../Services/localiza-producto.service';
import { CrudproductosService } from '../Services/crudproductos.service';

import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-mapaprincipal',
  templateUrl: './mapaprincipal.page.html',
  styleUrls: ['./mapaprincipal.page.scss'],
})
export class MapaprincipalPage implements OnInit, AfterViewInit {

  //Variables para el mapa
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  latM: any; //= 43.1746;
  lngM: any; //= -2.4125;
  zoom = 5;

  //map: any;
  public lat: any;
  public lon: any;
  marcadores: any;
  usersLocations: any[] = [];
  todosLosProductos: any[] = [];
  sinProductos: boolean = false;
  mapContainer:any;
  posicionDeProductos: any = [
    {
      latitud:'',
      longitud:''
    }
  ]

  apiKey:any = environment.gmaps;
  mapRef:any;
  markers: any[] = [];
  gMap: any;
  MisMarcadores:any;



  constructor(
    private ngZone: NgZone,
    private userLocation: LocalizaProductoService,
    private baseproductos: CrudproductosService,
 
  ) {
    this.mapbox.accessToken = environment.mapToken;
   }

  ngOnInit() {
    this.EnviarPosicion();
    this.MostrarTodosLosProductosDisponibles();
    this.AgregarMarcadores();
  }

  ngAfterViewInit(){
    this.mapRef = document.getElementById('map');
    //this.createGoogleMaps(33.6, -117.9);
  }



  async CurrentPosition(){
    let Options = {
      enableHighAccuracy:true,
    }
    
    const coordinates = await Geolocation.getCurrentPosition(Options);
    this.latM = coordinates.coords.latitude;
    this.lngM = coordinates.coords.longitude;
    this.createGoogleMaps(this.latM, this.lngM);
  }

  //ESTE CODIGO ESTA DESHABILITADO - MAPBOX
  /*CargarMapa(lat:any, lon: any){
    this.mapContainer = (<HTMLElement>document.getElementById('map'));
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.style,
      zoom: this.zoom,
      center: [lon, lat],   
    });

    this.todosLosProductos.map((val:any) =>{
      new mapboxgl.Marker({ color: '#673BB7' })
        .setLngLat([val.longitude, val.latitude])
        .addTo(this.map);
    })

    //.setPopup(new mapboxgl.Popup().setHTML("<h1 class='animate__animated animate__shakeY'>Hello World!</h1>"))
    this.map.addControl(new mapboxgl.NavigationControl());
  }*/


  //ENVIAR POSICION
  EnviarPosicion(){
    setInterval(() => {     
      this.userLocation.sendLocation().then(() =>{
        console.log("Se envio la posicion del Usuario");
      },(err) =>{
        console.log("No se pudo enviar la posicion: ",err);
      })
    }, 1 * 60 * 1000); // 30 minutos * 60 segundos * 1000 milisegundos
  }

  /*obtenerLosMarkers(){
    this.userLocation.getLocation().subscribe(res =>{
      console.log("Obtengo los marcadores de los usuarios: ",res);
    }, err =>{
      console.log("Error al cargar los marcadores: ",err);
    })
  }*/

  public MostrarTodosLosProductosDisponibles(){
    this.todosLosProductos = [];
    this.baseproductos.obtenerTodosLosProductos().subscribe(
      (productos) => {

        if(productos.length == 0){
          this.sinProductos = true;
          this.CurrentPosition();
          return;
        }else{
          this.todosLosProductos = productos;
          this.posicionDeProductos = this.todosLosProductos;
          //console.log("Productos: ",this.todosLosProductos);
          const coordenadas = this.todosLosProductos.map((posicion:any) => ({
            latitude: posicion.latitude,
            longitude: posicion.longitude
            
          }));

          this.MisMarcadores = coordenadas;
     

          console.log("Cooodenadas: ",coordenadas);
          this.CurrentPosition();
          this.sinProductos = false;
          //this.AgregarMarcadores();
        }
      },
      (error) => {
        //this.baseproductos.MensajeDeVerificacion("Error al cargar los productos");
      }
    );
  }

  async createGoogleMaps(lat:any, lon: any){
    this.gMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: lat,
          lng: lon,
        },
        zoom: 13, // The initial zoom level to be rendered by the map
      },
    });
  }
  
  

  async AgregarMarcadores(){
  
    await this.todosLosProductos.map((val:any) =>{

      this.gMap.addMarker({
        map:this.gMap,
          position:{
            lat:val.latitude,
            lng:val.longitude
          }
      });
        /*const marcadores = new google.maps.marker.AdvancedMarkerView({
          map:this.gMap,
          position:{
            lat:val.latitude,
            lng:val.longitude
          }
        })*/
        //return marcadores;
    });
  }




}
