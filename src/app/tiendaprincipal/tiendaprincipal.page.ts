import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';
import { AutenticacionService } from '../Services/autenticacion.service';

@Component({
  selector: 'app-tiendaprincipal',
  templateUrl: './tiendaprincipal.page.html',
  styleUrls: ['./tiendaprincipal.page.scss'],
})
export class TiendaprincipalPage implements OnInit {

  categorias: any = [];
  todosLosProductos: any[] = [];

  useremail: any;
  avatarImagen: any;
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

  

  sinProductos: boolean = false;


  constructor(
    private baseproductos: CrudproductosService,
    public autenticacion: AutenticacionService,
  ) { }

  ngOnInit() {
    this.CargarCategorias();
    this.MostrarTodosLosProductosDisponibles();
    this.useremail = localStorage.getItem("emailUser");
    this.CargarInformacionDelUsuario();
  }

  public CargarCategorias(){
    this.categorias = [
      {nombre:'Todos', imagen:'../../assets/icon/trocaderologo.jpg'},
      {nombre:'Diversion y Recreacion', imagen:'../../../assets/iconos/diversion.png'},
      {nombre:'Regalos', imagen:'../../assets/iconos/regalos.png'},
      {nombre:'Servicios Educativos', imagen:'../../assets/iconos/educativo.png'},
      {nombre:'Agro', imagen:'../../assets/iconos/agro.png'},
      {nombre:'Alimentos y Bebidas', imagen:'../../assets/iconos/bebidas.png'},
      {nombre:'Animales y Mascotas', imagen:'../../assets/iconos/animales.png'},
      {nombre:'Antiguedades y Colecciones', imagen:'../../assets/iconos/antiguedades.png'},
      {nombre:'Arte y Papeleria', imagen:'../../assets/iconos/arte.png'},
      {nombre:'Bebes', imagen:'../../assets/iconos/bebes.png'},
      {nombre:'Belleza y Cuidado Personal', imagen:'../../assets/iconos/belleza.png'},
      {nombre:'Consolas y Videojuegos', imagen:'../../assets/iconos/consolas.png'},
      {nombre:'Deportes y Fitness', imagen:'../../assets/iconos/deportes.png'},
      {nombre:'Instrumentos Musicales',imagen:'../../assets/iconos/instrumentos.png'},
      {nombre:'Juegos y Juguetes', imagen:'../../assets/iconos/juguetes.png'},
      {nombre:'Libros, Revistas y Comics', imagen:'../../assets/iconos/libros.png'},
      {nombre:'Ropa y Accesorios', imagen:'../../assets/iconos/ropa.png'},
      {nombre:'Salud y Equipamento Medico', imagen:'../../assets/iconos/salud.png'},

    ]
  }


  public MostrarTodosLosProductosDisponibles(){
    this.todosLosProductos = [];
    this.baseproductos.obtenerTodosLosProductos().subscribe(
      (productos) => {

        if(productos.length == 0){
          this.sinProductos = true;
          return;
        }else{
          this.todosLosProductos = productos;
          this.sinProductos = false;
        }
      },
      (error) => {
        this.baseproductos.MensajeDeVerificacion("Error al cargar los productos");
      }
    );
  }


  public FiltrarPorCategoria(_categoria: any){
   
    this.todosLosProductos = [];

    if(_categoria == "Todos"){
      this.MostrarTodosLosProductosDisponibles();
    }else{
      this.baseproductos.buscarProductosPorCategoria(_categoria).subscribe(
        (productos) => {
          this.todosLosProductos = productos;
          //console.log("PRODUCTOS POR CATEGORIA>>>> ",this.todosLosProductos);
        },
        (error) => {
          this.baseproductos.MensajeDeVerificacion("Error al cargar los productos");
          //console.error('Error al buscar productos por categoría en el componente', error);
          // Manejar el error según sea necesario
        }
      );
    }
    
  }

  CargarInformacionDelUsuario(){
    this.autenticacion.GetUserData(this.useremail).subscribe((res) =>{
      //console.log(">>>>>>>>> ",res);
      res.forEach(usuario =>{
        if(usuario.email == this.useremail){
          this.datosUsuario.uid = usuario.uid;
          this.datosUsuario.email = usuario.email;
          localStorage.setItem("useremail",this.datosUsuario.email);
          this.datosUsuario.displayName = usuario.displayName;
          
          this.datosUsuario.emailVerified = usuario.emailVerified;
          this.datosUsuario.nombres = usuario.nombres;
          this.datosUsuario.apellidos = usuario.apellidos;
          this.datosUsuario.direccion = usuario.direccion;
          this.datosUsuario.telefono = usuario.telefono;
          this.datosUsuario.pais = usuario.pais;
          this.datosUsuario.tienda = usuario.tienda;
          this.datosUsuario.imagenes = usuario.imagenes;

          if(this.datosUsuario.imagenes > 0){
            this.avatarImagen = usuario.imagenes[0];
            localStorage.setItem("foto",this.avatarImagen);
          }else{
            this.avatarImagen = "../../assets/no-preview.png";
            localStorage.setItem("foto",this.avatarImagen);
          }

        }

      })

    }),(error:any) => {

    }
  }


}
