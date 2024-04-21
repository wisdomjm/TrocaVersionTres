import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  DocUsuarios: string = 'Vendedores';
  userData: any; // Save logged in user data
  userID: any;

  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone,
    private toastController: ToastController 
  ) { 

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });


  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
        
        this.userID = result.user?.uid;
        localStorage.setItem('userID', this.userID);
        localStorage.setItem('emailUser',email);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.MensajeDeVerificacion("Bienvenido.");
          }
        });
      }).catch((error) => {
        this.MensajeDeVerificacion("Error, al Registrar tu Email y Contraseña.");
    });
  }


  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        this.MensajeDeVerificacion("Se ha Registrado correctamente.");
        this.SetUserData(result.user);
      }).catch((error) => {
        //window.alert(error.message);
        this.MensajeDeVerificacion("Error, al Registrar tu Email y Contraseña.");
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {
      this.router.navigate(['verificaremail']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
        //window.alert('Password reset email sent, check your inbox.');
        this.MensajeDeVerificacion("Correo electrónico de restablecimiento de contraseña enviado, revisa tu bandeja de entrada.")
      }).catch((error) => {
        window.alert(error);
        this.MensajeDeVerificacion("Error, verifica tu Email.")
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `UsuariosTrocadero/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      nombres: '',
      apellidos:'',
      direccion:'',
      telefono:'',
      pais:'',
      tienda:'',
      listaDeContactos:{}
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  GetUserData(UserId: any): Observable<any[]> {
    return this.afs.collection('UsuariosTrocadero', ref => ref.where('email', '==', UserId)).valueChanges();
  }

  async actualizarDatosUsuario(userId:any, nuevosDatos: any): Promise<void> { 
    return this.afs.collection('UsuariosTrocadero').doc(userId).update(nuevosDatos);
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
