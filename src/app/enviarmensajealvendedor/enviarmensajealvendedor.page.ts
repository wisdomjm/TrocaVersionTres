import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-enviarmensajealvendedor',
  templateUrl: './enviarmensajealvendedor.page.html',
  styleUrls: ['./enviarmensajealvendedor.page.scss'],
})
export class EnviarmensajealvendedorPage implements OnInit {

  @ViewChild(IonContent, {read: IonContent, static: false}) myContent!: IonContent;

  inputText: any;
  mensajes: any = [];

  chatMensajes: any = []
  
  clientesRegistrados: any[] = [];
  mensaje: any;
  mensajesDisponible: any = [];
  adminUser: any;
  usuarioSeleccionado: any;
  avatar: any;

  constructor(
    private chat: ChatService,
    public rutaActual: ActivatedRoute,
    public router: Router
  ) { }


  ngOnInit() {
    this.chatMensajes.usuario = this.rutaActual.snapshot.paramMap.get('userid');
    this.avatar = '../../assets/icon/trocaderologo.jpg';
    this.adminUser = localStorage.getItem('userID');
    this.cargarMensajes(this.chatMensajes.usuario);

  }


  ScrollToBottom(){
    let elemento = document.getElementsByClassName("mjs");
    let ultimo:any = elemento[elemento.length - 1];
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById("contenedor-mensajes")!.scrollTop = toppos;
    

  }


  public cargarMensajes(uiduser: any){  
    this.usuarioSeleccionado = uiduser;
    this.chat.obtenerMensajes(uiduser, this.adminUser).subscribe(respuesta =>{
      this.mensajesDisponible = respuesta;
      //console.log("El mensaje es: ", this.mensajesDisponible);
      setTimeout(() => {
        //this.ScrollToBottom();
        this.myContent.scrollToBottom(30);
     }, 10);
      
    }, error =>{
      console.log("Error al cargar los mensajes..", error);
    })
  }

  public enviarMensaje(){
    this.chat.enviarMensaje(this.adminUser, this.usuarioSeleccionado, this.inputText, this.avatar);
    this.cargarMensajes(this.usuarioSeleccionado);
    this.inputText = "";
    //this.ScrollToBottom();
    setTimeout(() => {
      //this.ScrollToBottom();
      this.myContent.scrollToBottom(30);
   }, 10);
  }

  desplazarHaciaAbajo() {
  
  }


  


}
