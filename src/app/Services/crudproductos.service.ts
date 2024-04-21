import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';  // Importa desde '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Asegúrate de importar AngularFireAuth desde '@angular/fire/compat/auth'
import { Observable } from 'rxjs';

import { ToastController } from '@ionic/angular';
import Producto from 'src/Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CrudproductosService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
  ) { }

  //Registrar nuevo Producto
  RegistrarNuevoProducto(uuid:any, data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('Productos').doc(uuid).set(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }


  //=======================================================================
  async agregarProductoAlCarrito(producto: any): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const userID = user.uid;
        const carritoRef = this.firestore.collection('productosEnCarritoDeCompra');  //.doc(userID);
        //carritoRef.set({ [producto.nombre]: producto }, { merge: false });
        carritoRef.add(producto);
      } else {
        console.error('Usuario no autenticado.');
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  }


  async obtenerProductosDelCarrito(): Promise<any> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const userID = user.uid;
        const carritoRef = this.firestore.collection('carritosDeCompras').doc(userID);
        return carritoRef.valueChanges();
      } else {
        console.error('Usuario no autenticado.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
      return null;
    }
  }

  //=======================================================================


  //CARRITO DE COMPRAS
  RegistrarProductosEnCarritoDeCompra(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('productosEnCarritoDeCompra').add(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }

  //BUSCAR LOS PRODUCTOS EN EL CARRITO POR idUsario
  buscarProductosEnCarritoDeCompras(idUsuario: string): Observable<any[]> {
    return this.firestore.collection('productosEnCarritoDeCompra', ref => ref.where('carritoClienteId', '==', idUsuario)).valueChanges();
  }

  buscarProductosEnCarritoDeComprasUsuario(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.firestore.collection('productosEnCarritoDeCompra').valueChanges();
        } else {
          reject('Usuario no autenticado');
        }
        
      });
    });
    
  }

  //CARRITO DE COMPRAS
  RegistrarProductosEnHistorialDeCompra(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('productosEnHistorialDeCompra').add(data)
            .then(() => {
              console.log('Producto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }
  
  //BUSCAR LOS PRODUCTOS EN EL Historial POR idvendedor
  buscarProductosEnHistorialDeCompras(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('productosEnHistorialDeCompra', ref => ref.where('historialClienteId', '==', idVendedor)).valueChanges();
  }

  //REGISTRAR PREGUNTAS DE UN PRODUCTO
  RegistrarUnaPreguntaEnUnProducto(pregunta: any):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('PreguntasTrocadero').add(pregunta)
            .then(() => {
              console.log('Pregunta registrada correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar la Pregunta', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }

  //CARGAR LAS PREGUNTAS DEL PRODUCTO
  cargarPreguntasPorIdProducto(idProducto: any): Observable<any[]> {
    return this.firestore.collection('PreguntasTrocadero', ref => ref.where('idProducto', '==', idProducto)).valueChanges();
    //return this.firestore.collection(`PreguntasTrocadero/${idProducto}`).valueChanges();
  }

  //Obtener la lista de Todos los Productos dentro de la Coleccion Productos
  obtenerTodosLosProductos(): Observable<any[]> {
    return this.firestore.collection('Productos').valueChanges();
  }

  obtenerProductoPorUuid(uuid:any): Observable<any> {
    
    return this.firestore.collection('Productos').doc(uuid).valueChanges();
  }

  //BUSCAR LOS PRODUCTOS POR NOMBRE
  buscarProductosPorNombre(nombre: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('nombre', '>=', nombre).where('nombre', '<=', nombre + '\uf8ff')).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR UNA CATEGORIA
  buscarProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('categoria', '==', categoria)).valueChanges();
  }

  //FILTRAR UN PRODUCTO POR EL ID DEL VENDEDOR
  buscarProductosPorIdDelVendedor(idVendedor: string): Observable<any[]> {
    return this.firestore.collection('Productos', ref => ref.where('idVendedor', '==', idVendedor)).valueChanges();
  }

  // Actualizar un producto específico
  actualizarProducto(idProducto: any, nuevoData: any): Promise<void> {
    return this.firestore.collection('Productos').doc(idProducto).update(nuevoData);
  }

  obtenerTodosLosUsariosChat(iduser:any): Observable<any[]> {
    return this.firestore.collection('ListaDeContacto', ref => ref.where('uid', '==', iduser)).valueChanges();
  }

  //Agregar lista de contactos para el chat
  CrearListaDeContacto(data: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          // Puedes cambiar 'Productos' por el nombre que desees para la colección principal
          this.firestore.collection('ListaDeContacto').add(data)
            .then(() => {
              console.log('lista de contacto registrado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al registrar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
  }

  obtenerTodosLosUsarios(): Observable<any[]> {
    return this.firestore.collection('UsuariosTrocadero').valueChanges();
  }

  obtenerNombreDocumentos(): Observable<any[]> {
    return this.firestore.collection('Productos').snapshotChanges();
  }

  ActualizarProducto(producto: Producto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          const productoRef = this.firestore.collection('Productos').doc(producto.nombre);
          // Utilizamos el método update() para actualizar el documento del producto con los nuevos datos
          productoRef.update(producto)
            .then(() => {
              console.log('Producto actualizado correctamente');
              resolve();
            })
            .catch((error) => {
              console.error('Error al actualizar el producto', error);
              reject(error);
            });
        } else {
          reject('Usuario no autenticado');
        }
      });
    });
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
