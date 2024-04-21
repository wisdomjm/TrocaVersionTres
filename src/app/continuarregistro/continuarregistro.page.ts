import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Services/autenticacion.service';

@Component({
  selector: 'app-continuarregistro',
  templateUrl: './continuarregistro.page.html',
  styleUrls: ['./continuarregistro.page.scss'],
})
export class ContinuarregistroPage implements OnInit {

  miemail: any;
  datosUsuario: any = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: '',
    nombres: '',
    apellidos:'',
    direccion:'',
    telefono:'',
    pais:'',
    tienda:''
  }

  constructor(
    public rutaActual: ActivatedRoute,
    public autenticacion: AutenticacionService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.miemail = this.rutaActual.snapshot.paramMap.get('email');
    this.ObtenerLaInformacionDelUsuarioParaActualizar();
  }

  ObtenerLaInformacionDelUsuarioParaActualizar(){
    this.autenticacion.GetUserData(this.miemail).subscribe((res) =>{
      console.log(">>>>>>>>> ",res);
      res.forEach(usuario =>{
        if(usuario.email == this.miemail){
          this.datosUsuario.uid = usuario.uid;
          this.datosUsuario.email = usuario.email;
          this.datosUsuario.displayName = usuario.displayName;
          this.datosUsuario.photoURL = usuario.photoURL;
          this.datosUsuario.emailVerified = usuario.emailVerified;
          usuario.nombres = this.datosUsuario.nombres;
          usuario.apellidos = this.datosUsuario.apellidos;
          usuario.direccion = this.datosUsuario.direccion;
          usuario.telefono = this.datosUsuario.telefono;
          usuario.pais = this.datosUsuario.pais;
          usuario.tienda = this.datosUsuario.tienda;

          



        }
      })

    }),(error:any) => {

    }
  }


  ActualizaDatos(userid:any, datos:any){
    this.autenticacion.actualizarDatosUsuario(userid,datos).then(() =>{
      this.autenticacion.MensajeDeVerificacion("Se ha Guardado los datos correctamente.");
      this.router.navigate(['iniciarsesion']);
    }).catch(() =>{
      this.autenticacion.MensajeDeVerificacion("Error al guardar la informacion.");
    })
  }

  GuardarInformacion(){
    //ACTUALIZA DATOS DEL USUARIO
    this.ActualizaDatos(this.datosUsuario.uid, this.datosUsuario);
  }

}
