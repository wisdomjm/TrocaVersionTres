import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { loadScript } from "@paypal/paypal-js";
import { CrudproductosService } from '../Services/crudproductos.service';

@Component({
  selector: 'app-paginadepago',
  templateUrl: './paginadepago.page.html',
  styleUrls: ['./paginadepago.page.scss'],
})
export class PaginadepagoPage implements OnInit {

  //PAYPAL
  PAYPAL_CLIENT_ID: string = 'AZmjqPRafsfOWIOz_aX9-zyI44cLir1zgxxM2QQO1O9DHDSs7CHIZtD38IfW4YHU8-hKKSfHwzHgUZ2w';
  //@ViewChild('paypalRef', { static: true }) private paypalRef?: ElementRef;
  productoActual: any = {
    nombre:'',
    descripcionCorta:'',
    precio:0,
    cantidadDisponible:0,
    idVendedor:'',
    imagenes:'',
    idUsuario:'' 
  };

  constructor(
    public rutaActual: ActivatedRoute,
    public ruta: Router,
    public productocomprado: CrudproductosService
  ) { 
    this.productoActual.nombre = this.rutaActual.snapshot.paramMap.get('nombreProducto');
    this.productoActual.idVendedor = this.rutaActual.snapshot.paramMap.get('idVendedor');
    this.productoActual.precio = this.rutaActual.snapshot.paramMap.get('precio');
    this.productoActual.cantidadDisponible = this.rutaActual.snapshot.paramMap.get('cantidad');
    this.productoActual.descripcionCorta = this.rutaActual.snapshot.paramMap.get('descripcion');
    this.productoActual.imagenes = this.rutaActual.snapshot.paramMap.get('imagen');
    this.productoActual.idUsario = localStorage.getItem('userID');
  }

  ngOnInit() {
    var descripcion = "";
    var valor = 0;
    descripcion = this.productoActual.descripcionCorta;
    valor = this.productoActual.precio;
    //paypal.Buttons.driver("angular", window.angular);
    loadScript(
      { 
        clientId: "AZmjqPRafsfOWIOz_aX9-zyI44cLir1zgxxM2QQO1O9DHDSs7CHIZtD38IfW4YHU8-hKKSfHwzHgUZ2w",
        currency: "USD" 
      }).then((paypal:any) => {
          
          paypal.Buttons({
              createOrder: function(data: any, actions: any) {
                return actions.order.create({
                    purchase_units: [{
                        "description": descripcion, //descripcion del producto
                        "amount": {
                            "currency_code": "USD",
                            "value": valor //valor del producto
                        }
                    }]
                });
            },
            onApprove: function(data: any, actions: any) {
                return actions.order.capture().then((orderData: any) => {
                  console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                  const elemento = document.getElementById('#paypal-buttons')!;
                  const contenidoAmostrar = document.getElementById('contenido')!;
                  const header = document.getElementById('header-content')!;
                  //element.innerHTML = '';
                  //element.innerHTML = '<h3>Thank you for your payment!</h3>';
                  const pago = orderData.status;
                  const precioTotal = orderData.purchase_units[0].amount.value;
                  const descripcion = orderData.purchase_units[0].description;
                  const comprador = orderData.purchase_units[0].shipping.name.full_name;
                  const direccion = orderData.purchase_units[0].shipping.address.address_line_1;
                  const ciudad = orderData.purchase_units[0].shipping.address.admin_area_2;
                  const departamento = orderData.purchase_units[0].shipping.address.admin_area_1;
                  const pais = orderData.purchase_units[0].shipping.address.country_code;
                  const nombreCliente = orderData.payer.name.given_name;
                  const apellidoCliente = orderData.payer.name.surname;  
                  const email = orderData.payer.email_address;    
                  const idpago = orderData.payer.payer_id;  

                  /*console.log("PAGO: ",pago);
                  console.log("PRECIO TOTAL: ",precioTotal);  
                  console.log("DESCRIPCION: ",descripcion);
                  console.log("COMPRADOR: ",comprador); 
                  console.log("DIRECCION: ",direccion); 
                  console.log("CIUDAD: ",ciudad); 
                  console.log("DEPARTAMENTO: ",departamento); 
                  console.log("PAIS: ",pais); 
                  console.log("NOMBRE COMPRADOR: ",nombreCliente); 
                  console.log("APELLIDO COMPRADOR: ",apellidoCliente); 
                  console.log("EMAIL: ",email); 
                  console.log("ID COMPRADOR: ",idpago);*/ 


                  if(orderData.status === 'COMPLETED'){   
                    console.log("Yeahhhhhhhh..........")
                    elemento.innerHTML = '';
                    contenidoAmostrar.innerHTML = '',
                    header.innerHTML = '';
  
                    contenidoAmostrar.innerHTML = `
                    
                    <div class="vspace"></div>
                    <div class="vspace"></div>
                    <div style="display: flex; margin: 10px auto; justify-content: center; align-items: center;">
                      <img src="../../assets/icon/trocaderologo.jpg" alt="" style="width: 72px; height: 72px; border-radius: 8px 8px 8px 8px;">
                    </div>
                    
                    <div class="vspace"></div>
                    <h1 class="ion-text-center texto-60" 
                      style="font-weight: 800; font-size: 32px;">
                      Trocadero<span style="font-size: 52px; color: #673BB7;">S</span>hop
                    </h1>
              
                    <h1 class="ion-text-center">Confirmacion de Pago</h1>
                    <div class="vspace"></div>
                    <ion-card>
                      <ion-card-content>
                        <p><strong>Estado del pago:</strong> ${orderData.status}</p>
                        <p><strong>Descripcion:</strong> ${orderData.purchase_units[0].description}</p>
                        <p><strong>Valor Pagado:</strong> ${orderData.purchase_units[0].amount.value}</p>
                        <p><strong>ID Pago:</strong> ${orderData.payer.payer_id}</p>
                        <br>
                        
                      </ion-card-content>
                    </ion-card>
                    <ion-button mode="ios" expand=block color="trocadero" id="btnGuardar">Aceptar</ion-button>
                  `;
                    //this.router.navigate(['/comprobaciondepago',pago,precioTotal,descripcion,comprador,direccion,ciudad,departamento,pais,nombreCliente,apellidoCliente,email,idpago]); 
                   const guardar = document.getElementById('btnGuardar')!;  
                   guardar.addEventListener("click", guardarMiProductoComprado);
                  }

                });
            },
            onError: function(err: any) {
                console.log(err);
            },
            style: {
              layout: 'vertical',
              color:  'blue',
              shape:  'rect',
              label:  'paypal'
            }
          }).render("#paypal-buttons").catch((error: any) => {
          console.error("failed to render the PayPal Buttons", error);
        });
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });

      const guardarMiProductoComprado = () =>{
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
        this.guardarInformacion();
    }

  }

  /*public enviarInformacionDeConfirmacionDePago(pagoStatus:any,preciototal:any,descripcion:any,comprador:any,direccion:any,ciudad:any,departamento:any,pais:any,nombrecliente:any,apellidocliente:any,email:any,idpago:any
  ){
    this.ruta.navigate(['/comprobaciondepago',pagoStatus,preciototal,descripcion,comprador,direccion,ciudad,departamento,pais,nombrecliente,apellidocliente,email,idpago]);
  }*/

  guardarInformacion(){
    //this.registrarCurso.AgregarCursoAMisCursos(this.productoActual).then(() =>{
      console.log("se registro el curso");
      //this.GoHomeApp();
    //},(erro:any) =>{
      //console.log("error al registrar el curso");  
    //})
    this.productocomprado.RegistrarProductosEnHistorialDeCompra(this.productoActual).then(res =>{
      console.log("re registro producto en mis productos comprados");
    },err =>{
      console.log("error al registrar el producto: ",err);  
    })
  }




}
