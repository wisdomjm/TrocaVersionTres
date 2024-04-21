import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Services/autenticacion.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  email: string = "";
  mipassword: string = "";
  loading: boolean = false;

  contrasena: string;
  mostrarContrasena: boolean = false;

  constructor(
    public router: Router,
    public autenticacion: AutenticacionService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  IniciarSesion(){
    if(this.email == "" || this.mipassword == ""){
      this.MensajeDeVerificacion("El campo de Email o Contraseña no deben de estar vacios.");
    }else{

        if (this.validarEmail(this.email)) {
          console.log("Correo electrónico válido");
          
          this.autenticacion.SignIn(this.email, this.mipassword).then((resp) =>{
            //console.log("Inicio sesion el usuario: ",resp);
            this.router.navigate(['tiendaprincipal']);
            this.mensajeDeBienvenida();
          }).catch((error) =>{
            this.autenticacion.MensajeDeVerificacion("Verifica el Email o Contraseña");
            //console.log("ocurrio un error al registrar el usuario: ",error);  
          }).finally(() =>{
          
        })

      } else {
        console.log("Correo electrónico no válido");
        this.autenticacion.MensajeDeVerificacion("Verifica el Email");
      }


    }
   
  }

  mensajeDeBienvenida(){
    this.autenticacion.MensajeDeVerificacion("Bienvenido a Trocaderoshop.");
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      //duration: 3000,
    });

    loading.present();
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  validarEmail(email:any) {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
