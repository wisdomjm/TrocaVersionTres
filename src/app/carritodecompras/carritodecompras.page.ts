import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';
import Producto from 'src/Models/Producto';

@Component({
  selector: 'app-carritodecompras',
  templateUrl: './carritodecompras.page.html',
  styleUrls: ['./carritodecompras.page.scss'],
})
export class CarritodecomprasPage implements OnInit {

  productosEnCarrito: any = [];
  
  /*{
      nombre: '',
      descripcionCorta: '',
      descripcionLarga: '',
      categoria: '',
      precio: '',
      cantidadDisponible: '',
      idVendedor: '',
      imagenes: ''
    };*/

  idUsuario: any;
  precioTotal: any;

  constructor(
    private basedatos: CrudproductosService
  ) { }

  ngOnInit() {
    //const losproductos = localStorage.getItem('carritoDeCompras');
    //this.productosEnCarrito.push(JSON.parse(losproductos || '{}'));
    //console.log("LOS PRODUCTOS ALMACENADOS SON: ",this.productosEnCarrito);
    this.idUsuario = localStorage.getItem('userID');
    this.cargarProductosDelCarrito();
  }

  async cargarProductosDelCarrito(){
    this.productosEnCarrito = [];

    await this.basedatos.buscarProductosEnCarritoDeCompras(this.idUsuario).subscribe(
      (productos) => {
      
        this.productosEnCarrito = productos;
        console.log("PRODUCTOS ENCONTRADOS VENDEDOR>>>>> ",this.productosEnCarrito);
        
        /*productos.forEach((prod:any) =>{
          
          if(prod.carritoClienteId == this.idUsuario){
            this.productosEnCarrito.nombre = prod.nombre;
            this.productosEnCarrito.descripcionCorta = prod.descripcionCorta;
            this.productosEnCarrito.descripcionLarga = prod.descripcionLarga;
            this.productosEnCarrito.categoria = prod.categoria;
            this.productosEnCarrito.precio = prod.precio;
            this.productosEnCarrito.cantidadDisponible = prod.cantidadDisponible;
            this.productosEnCarrito.idVendedor = prod.idVendedor;
          }
          

          this.productosEnCarrito.push(prod);
          console.log("Productos en carrito de compras: ", this.productosEnCarrito);
        })*/

       

        //obtengo los precios de cada item
        const obtenerPrecios = this.productosEnCarrito.map((productos:any) => productos.precio);
        //sumo los precios de cada item y obtengo el total
        this.precioTotal = obtenerPrecios.reduce((total:any, precio:any) => total + precio, 0);
        
      },
      (error) => {
        this.basedatos.MensajeDeVerificacion("Error al cargar los productos del Carrito");
        //console.error('Error al buscar productos en el componente', error);
        // Manejar el error según sea necesario
      }
    );
  }

}
