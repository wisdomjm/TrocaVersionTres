import { Component, OnInit } from '@angular/core';
//import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AutenticacionService } from '../Services/autenticacion.service';
import { SubirmultimediaService } from '../Services/subirmultimedia.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ActivatedRoute } from '@angular/router';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}


@Component({
  selector: 'app-perfildeusuario',
  templateUrl: './perfildeusuario.page.html',
  styleUrls: ['./perfildeusuario.page.scss'],
})
export class PerfildeusuarioPage implements OnInit {

  images: LocalFile[] = [];

  useremail: any;
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
    tienda:'',
    imagenes:{}
  }

  fotoPerfilURL: any;
  fotoSeleccionada: File[] = [];
  imagenPrevia: any;
  imagenSeleccionada!: File;
  archivosSeleccionados: File[] = [];
  imagenesDelProducto: any = [];
  avatarImagen:any =  "";

  constructor(
    public autenticacion: AutenticacionService,
    private foto: SubirmultimediaService,
    private authService: AngularFireAuth,
		private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    public rutaActual: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.useremail = localStorage.getItem("emailUser");
    this.avatarImagen = localStorage.getItem('foto');
    console.log("FOTO PERFIL", this.avatarImagen);

    if(this.avatarImagen == null){
      this.avatarImagen = "../../assets/no-preview.png";
    }else{
      this.avatarImagen = localStorage.getItem('foto');
    }
    
    this.imagenPrevia = this.avatarImagen; //"../../assets/no-preview.png";
    this.CargarInformacionDelUsuario();
  }

  CargarInformacionDelUsuario(){
    this.autenticacion.GetUserData(this.useremail).subscribe((res) =>{
      //console.log(">>>>>>>>> ",res);
      res.forEach(usuario =>{
        if(usuario.email == this.useremail){
          this.datosUsuario.uid = usuario.uid;
          this.datosUsuario.email = usuario.email;
          this.datosUsuario.displayName = usuario.displayName;
          
          this.datosUsuario.emailVerified = usuario.emailVerified;
          this.datosUsuario.nombres = usuario.nombres;
          this.datosUsuario.apellidos = usuario.apellidos;
          this.datosUsuario.direccion = usuario.direccion;
          this.datosUsuario.telefono = usuario.telefono;
          this.datosUsuario.pais = usuario.pais;
          this.datosUsuario.tienda = usuario.tienda;
          this.datosUsuario.imagenes = usuario.imagenes[0];
          this.avatarImagen = this.datosUsuario.imagenes;
          localStorage.setItem('foto',this.datosUsuario.imagenes[0]);
        }
      })

    }),(error:any) => {

    }
  }

  seleccionarArchivosImagen(event: any) {
    this.archivosSeleccionados = event.target.files;
    
    if (!this.archivosSeleccionados) {
      //console.error("No se proporcionó ningún archivo.");
      this.MensajeDeVerificacion("No se selecciono ninguna imagen.");
      return;
    }
  }

  async subirArchivosImagen() {
    if (this.archivosSeleccionados.length > 0) {
      this.imagenPrevia = "";
      this.MostrarLoading();
      const urls = await this.foto.subirFotoPerfil(this.archivosSeleccionados, this.datosUsuario.uid);
      console.log('URLs de descarga:', urls);
      this.imagenesDelProducto = urls;
      this.datosUsuario.imagenes = this.imagenesDelProducto;
      

      if(this.imagenesDelProducto.length > 0){
        this.imagenPrevia = this.imagenesDelProducto[0];
        //this.avatarImagen = this.imagenesDelProducto[0];
        this.loadingCtrl.dismiss();
      }
      this.ActualizarInformacion();
    } else {
      this.MensajeDeVerificacion("No se seleccionaron las imagenes del Producto.");
      this.loadingCtrl.dismiss();
      //console.log('No se seleccionaron archivos.');
    }
  }


  async MostrarLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading',
      spinner: 'bubbles' 

    });

    loading.present();
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  ActualizarInformacion(){
    this.autenticacion.actualizarDatosUsuario(this.datosUsuario.uid,this.datosUsuario).then(() =>{
      this.autenticacion.MensajeDeVerificacion("Se ha Guardado los datos correctamente.");
      //this.router.navigate(['iniciarsesion']);
    }).catch(() =>{
      this.autenticacion.MensajeDeVerificacion("Error al guardar la informacion.");
    }).finally(() =>{
      this.CargarInformacionDelUsuario();
    })
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                  //this.takePicture(this.camera.PictureSourceType.CAMERA);
                  this.takePicture();
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };


}
