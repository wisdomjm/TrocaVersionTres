import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { AutenticacionService } from './Services/autenticacion.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  useremail: any;
  constructor(
    private router: Router,
    private menu: MenuController,
    private auth: AutenticacionService,

  ) {
    
  }

  ngOnInit() {
    this.useremail = localStorage.getItem("emailUser");
    //this.CargarInformacionDelUsuario();
  }

  PerfilDeUsuario(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/perfildeusuario']);
    })
    
    
  }

  AgregarProducto(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/membresias']);
      //this.router.navigate(['/agregarproducto']);
    })
    
    
  }

  MapaProducto(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/mapaprincipal']);
    })
    
    
  }

  Notificaciones(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/notificaciones']);
    })
    
    
  }

  Mensajes(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/mensajes']);
    })
    
    
  }

  MisProducto(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/misproductos']);
    })
  }

  HistorialProductos(){
    this.menu.close("first").then(() => {
      this.router.navigate(['/historial']);
    })
  }

  CerrarSesion(){
    this.auth.SignOut();
  }

  
}
