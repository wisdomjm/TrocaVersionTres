import { Component, OnInit } from '@angular/core';
import { CrudproductosService } from '../Services/crudproductos.service';

@Component({
  selector: 'app-buscarproducto',
  templateUrl: './buscarproducto.page.html',
  styleUrls: ['./buscarproducto.page.scss'],
})
export class BuscarproductoPage implements OnInit {

  nombreProducto: string = '';
  productosEncontrados: any[] = [];

  constructor(
    private baseproductos: CrudproductosService
  ) { }

  ngOnInit() {
  }

  buscarProductos() {
    this.productosEncontrados = [];
    this.baseproductos.buscarProductosPorNombre(this.nombreProducto).subscribe(
      (productos) => {
        this.productosEncontrados = productos;
        //console.log("PRODUCTOS ENCONTRADOS>>>>> ",this.productosEncontrados);
      },
      (error) => {
        this.baseproductos.MensajeDeVerificacion("Producto no Existente aun");
        //console.error('Error al buscar productos en el componente', error);
        // Manejar el error según sea necesario
      }
    );
  }

}
