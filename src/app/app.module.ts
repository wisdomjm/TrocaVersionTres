import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
  
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// geolocation and native-geocoder
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoder } from '@capgo/nativegeocoder';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule, IonicModule.forRoot(),   
    AppRoutingModule,
    HttpClientModule,
  
    //NgxPayPalModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"trocadero-c0449","appId":"1:496141058160:web:f7837139f3c88f1bd5b4b5","databaseURL":"https://trocadero-c0449-default-rtdb.firebaseio.com","storageBucket":"trocadero-c0449.appspot.com","apiKey":"AIzaSyAgQR6H9WJk6Xle0BToTTug78a8sKjRTIc","authDomain":"trocadero-c0449.firebaseapp.com","messagingSenderId":"496141058160","measurementId":"G-975QZGWQJB"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging())
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    //Geolocation,
    //NativeGeocoder,
    HttpClient,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
