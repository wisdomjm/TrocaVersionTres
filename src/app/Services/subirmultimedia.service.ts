import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SubirmultimediaService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
  ) { }

  // Subir imagen al Storage y actualizar el campo de imagen en la base de datos
  subirImagenYActualizarProducto(nombreProducto: string, imagen: File){
    const userId = this.auth.currentUser;

    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    // Ruta en el Storage donde se almacenará la imagen (puedes ajustarla según tus necesidades)
    const filePath = `Productos/${userId}/${nombreProducto}_${new Date().getTime()}_${imagen.name}`;

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imagen);

    uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        const downloadURL = await storageRef.getDownloadURL().toPromise();

        // Actualizar el campo de imagen en la base de datos con la URL de la imagen
        //this.firestore.collection('Productos').doc(idProducto).update({ imagen: downloadURL });

        return downloadURL;
      })
    );
  }

  subirMultiplesImagenes(files: File[], userIdentification: any, nombreProducto: any): Promise<string[]> {
    const filesArray = Array.from(files);

    const uploadTasks = filesArray.map(file => {
      const filePath = `carpeta-imagenes/${userIdentification}/${nombreProducto}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }

  subirMultiplesVideo(files: File[], userIdentification: any, nombreProducto: any): Promise<string[]> {
    const filesArray = Array.from(files);

    const uploadTasks = filesArray.map(file => {
      const filePath = `carpeta-videos/${userIdentification}/${nombreProducto}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }

  /*async subirFotoPerfil(uid: string, file: File[]): Promise<string> {
    const filesArray = Array.from(file);
    const uploadTasks = filesArray.map(file => {

      const filePath = `fotos_perfil/${uid}/${new Date().getTime()}_${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.then(async snapshot => {
          const downloadURL = await snapshot.ref.getDownloadURL();
          resolve(downloadURL);
        }).catch(error => {
          reject(error);
        });
      });

      
    });

    //return Promise.all(uploadTasks);
    
  }*/

  /*subirFotoPerfil(myfile: File[], userIdentification: any): Promise<string[]> {
    const filesArray = Array.from(myfile);

    const uploadTasks = filesArray.map(file => {
      const filePath = `foto-perfil/${userIdentification}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(myfile);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }*/

  subirFotoPerfil(files: File[], userIdentification: any): Promise<string[]> {
    const filesArray = Array.from(files);

    const uploadTasks = filesArray.map(file => {
      const filePath = `foto-perfil/${userIdentification}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
    });

    await toast.present();
  }



}
