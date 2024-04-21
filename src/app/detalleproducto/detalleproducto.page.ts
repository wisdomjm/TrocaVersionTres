import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import { CrudproductosService } from '../Services/crudproductos.service';
import Producto from 'src/Models/Producto';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.page.html',
  styleUrls: ['./detalleproducto.page.scss'],
})
export class DetalleproductoPage implements OnInit, AfterViewInit {

  //Variables para el mapa
  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v12`;
  // Coordenadas de la localización donde queremos centrar el mapa
  latM: any; //= 43.1746;
  lngM: any; //= -2.4125;
  zoom = 15;
  //####################################

  productoActual: any;
  _idVendedor: any;
  idUsuario: any;


  imagenProductoPrincipal: any;
  videoPrincipal: string = "";
  todaslasimagenes: any = [];

  productoEncontrado: Producto = {
    nombre:'',
    descripcionCorta:'',
    descripcionLarga:'', 
    categoria:'',
    precio:0,
    cantidadDisponible:0,
    idVendedor:'',
    fechaCreacion:'',
    imagenes:{},
    video:{},
    carritoClienteId:'',
    historialClienteId:'',
  };

  pregunta: any = {}
    //idProducto: any,
    //mipregunta: ''
  

  preguntasDelProducto: any = [];

  //map: any;
  public lat: any;
  public lon: any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  mapContainer:any;

  apiKey:any = environment.gmaps;
  mapRef:any;
  gMap: any;

  constructor(
    public rutaActual: ActivatedRoute,
    private basededatos: CrudproductosService,
    public route: Router
  ) { 
    this.mapbox.accessToken = environment.mapToken;
  }

  ngOnInit() {
    this.mapRef = document.getElementById('map');
    this.productoActual = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this._idVendedor = this.rutaActual.snapshot.paramMap.get('idVendedor');
    this.idUsuario = localStorage.getItem('userID');


  }

  ngAfterViewInit(){
    this.CargarLaInformacionDelProducto(this.productoActual,this._idVendedor);
    this.CargarLasPreguntasRealizadas();
  }

  GuardarInformacionEnHistorial(){
    this.productoEncontrado.imagenes = this.imagenProductoPrincipal;
    this.productoEncontrado.historialClienteId = this.idUsuario;
    const productoAgregar = this.productoEncontrado;//producto a agregar
    this.basededatos.RegistrarProductosEnHistorialDeCompra(productoAgregar).then(() =>{
      console.log("se registro en historial");
    }).catch((err =>{
      console.log("error al registrar el producto: ",err);
    }))
  }

  

  CargarMapa(lat:any, lon: any){
    this.mapContainer = (<HTMLElement>document.getElementById('map'));
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.style,
      zoom: this.zoom,
      center: [lon, lat],
      
    });
    const marker2 = new mapboxgl.Marker({ color: '#673BB7' }).setLngLat([lon, lat]).addTo(this.map);


    this.map.addControl(new mapboxgl.NavigationControl());
  }


  CargarLaInformacionDelProducto(producto: any, idvendedor: any){
    this.basededatos.buscarProductosPorNombre(producto).subscribe((resp) =>{
      //console.log("EL PRODUCTO ES: ",resp);
      resp.forEach(produc =>{
        if(produc.idVendedor == idvendedor){
          this.productoEncontrado.nombre = produc.nombre;
          this.productoEncontrado.descripcionCorta = produc.descripcionCorta;
          this.productoEncontrado.descripcionLarga = produc.descripcionLarga;
          this.productoEncontrado.categoria = produc.categoria;
          this.productoEncontrado.precio = produc.precio;
          this.productoEncontrado.cantidadDisponible = produc.cantidadDisponible;
          this.productoEncontrado.idVendedor = produc.idVendedor;
          this.productoEncontrado.video = produc.video;
          this.productoEncontrado.latitude = produc.latitude;
          this.productoEncontrado.longitude = produc.longitude;
          this.pregunta.idProducto = produc.nombre;

          if(produc.imagenes.length > 0){
            this.imagenProductoPrincipal = produc.imagenes[0];
          }

          this.videoPrincipal = produc.video[0];
          if(produc.video.length > 0){
            
          }
        }
        this.todaslasimagenes = produc.imagenes;
        this.GuardarInformacionEnHistorial();
        //this.createGoogleMaps(this.productoEncontrado.latitude, this.productoEncontrado.longitude);
        //this.CargarMapa(this.productoEncontrado.latitude, this.productoEncontrado.longitude);
      })

      
      
    },(error) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar la Informacion del Producto");
      //console.error('Error al buscar productos en el componente', error);
    });
    
  }

  AgregarAlCarrito(){

    this.productoEncontrado.imagenes = this.imagenProductoPrincipal;
    this.productoEncontrado.carritoClienteId = this.idUsuario;
    const productoAgregar = this.productoEncontrado;//producto a agregar

    this.basededatos.agregarProductoAlCarrito(productoAgregar).then((res) =>{
      //console.log("Se agrego al carrito");
      this.basededatos.MensajeDeVerificacion("Se agrego al carrito de Compras");
    }).catch((err) =>{
      this.basededatos.MensajeDeVerificacion("Error al registrar el producto");
      //console.log("Error al registrar el producto: ",err);
    });

  }

  CambiarImagenAMostrar(imagen: any){
    this.imagenProductoPrincipal = imagen;
  }

  EnviarPregunta(){
    this.basededatos.RegistrarUnaPreguntaEnUnProducto(this.pregunta).then((res)=>{
      //console.log("Se Registro una pregunta...");
    }).catch((err) =>{
      this.basededatos.MensajeDeVerificacion("Error al registrar la pregunta");
      //console.log("Error al registrar la pregunta: ", err);
    }).finally(() =>{
      this.pregunta.mipregunta = '';
      this.CargarLasPreguntasRealizadas();
    })
  }

  CargarLasPreguntasRealizadas(){
    this.basededatos.cargarPreguntasPorIdProducto(this.productoActual).subscribe((res) =>{
      res.forEach(produc =>{
        if(produc.idProducto == this.productoActual){
          this.preguntasDelProducto = res;
        }
      })
      
      this.preguntasDelProducto = res;
    },(erro) =>{
      this.basededatos.MensajeDeVerificacion("Error al cargar las preguntas");
      //console.log("Error al cargar las preguntas: ",erro);
    })
  }

  Comprar(){
    /* routerLink="/paginadepago" */
    this.route.navigate(['paginadepago/',
      this.productoEncontrado.nombre,
      this.productoEncontrado.idVendedor,
      this.productoEncontrado.precio,
      this.productoEncontrado.cantidadDisponible,
      this.productoEncontrado.descripcionCorta,
      this.imagenProductoPrincipal
    ]);
  }

  async createGoogleMaps(lat:any, lon: any){
    this.gMap = await GoogleMap.create({
      id: 'mymap', // Unique identifier for this map instance
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

    this.addMarker(this.gMap,lat,lon);
  }

  addMarker(map:any, latitude:any, longitude:any){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: {
        lat:latitude,
        lng: longitude
      }
    });

  }




}
