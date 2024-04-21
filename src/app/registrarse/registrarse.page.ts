import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Services/autenticacion.service';
import { CrudproductosService } from '../Services/crudproductos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  email: string = "";
  password: string = "";

  contrasena: string;
  mostrarContrasena: boolean = false;

  constructor(
    public router: Router,
    public autenticacion: AutenticacionService,
    private baseproductos: CrudproductosService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }
  //routerLink="/continuarregistro"

  async RegistrarUsuario(){

    if(this.email == "" || this.password == ""){
      this.MensajeDeVerificacion("El campo de Email o Contraseña no deben de estar vacios.");
    }else{

      
      if (this.validarEmail(this.email)) {
        console.log("Correo electrónico válido");
        await this.autenticacion.SignUp(this.email, this.password).then((resp) =>{
          //console.log("Se registro el usuario: ",resp);
          this.router.navigate(['/continuarregistro',this.email]);
        }).catch((error) =>{
          this.baseproductos.MensajeDeVerificacion("Ocurrio un error al registrar el usuario, verifica tus datos");
          //console.log("ocurrio un error al registrar el usuario: ",error);  
        })

      } else {
        console.log("Correo electrónico no válido");
        this.autenticacion.MensajeDeVerificacion("Verifica el Email");
      }


     
    }


   
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
