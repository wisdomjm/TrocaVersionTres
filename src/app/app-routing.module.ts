import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'agregarproducto',
    loadChildren: () => import('./agregarproducto/agregarproducto.module').then( m => m.AgregarproductoPageModule)
  },
  {
    path: 'tiendaprincipal',
    loadChildren: () => import('./tiendaprincipal/tiendaprincipal.module').then( m => m.TiendaprincipalPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'iniciarsesion',
    loadChildren: () => import('./iniciarsesion/iniciarsesion.module').then( m => m.IniciarsesionPageModule)
  },
  {
    path: 'recuperarcuenta',
    loadChildren: () => import('./recuperarcuenta/recuperarcuenta.module').then( m => m.RecuperarcuentaPageModule)
  },
  {
    path: 'detalleproducto/:nombreProducto/:idVendedor',
    loadChildren: () => import('./detalleproducto/detalleproducto.module').then( m => m.DetalleproductoPageModule)
  },
  {
    path: 'carritodecompras',
    loadChildren: () => import('./carritodecompras/carritodecompras.module').then( m => m.CarritodecomprasPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'perfildeusuario',
    loadChildren: () => import('./perfildeusuario/perfildeusuario.module').then( m => m.PerfildeusuarioPageModule)
  },
  {
    path: 'buscarproducto',
    loadChildren: () => import('./buscarproducto/buscarproducto.module').then( m => m.BuscarproductoPageModule)
  },
  {
    path: 'sidemenu',
    loadChildren: () => import('./sidemenu/sidemenu.module').then( m => m.SidemenuPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'continuarregistro/:email',
    loadChildren: () => import('./continuarregistro/continuarregistro.module').then( m => m.ContinuarregistroPageModule)
  },
  {
    path: 'verificaremail',
    loadChildren: () => import('./verificaremail/verificaremail.module').then( m => m.VerificaremailPageModule)
  },
  {
    path: 'misproductos',
    loadChildren: () => import('./misproductos/misproductos.module').then( m => m.MisproductosPageModule)
  },
  {
    path: 'paginadepago/:nombreProducto/:idVendedor/:precio/:cantidad/:descripcion/:imagen',
    loadChildren: () => import('./paginadepago/paginadepago.module').then( m => m.PaginadepagoPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'enviarmensajealvendedor/:userid',
    loadChildren: () => import('./enviarmensajealvendedor/enviarmensajealvendedor.module').then( m => m.EnviarmensajealvendedorPageModule)
  },
  {
    path: 'mapaprincipal',
    loadChildren: () => import('./mapaprincipal/mapaprincipal.module').then( m => m.MapaprincipalPageModule)
  },
  {
    path: 'editarproductos/:nombreProducto/:idProducto',
    loadChildren: () => import('./editarproductos/editarproductos.module').then( m => m.EditarproductosPageModule)
  },
  {
    path: 'comprobaciondepago/:pagoStatus/:precioTotal/:descripcion/:comprador/:direccion/:ciudad/:departamento/:pais/:nombreCliente/:apellidoCliente/:email/:idpago',
    loadChildren: () => import('./comprobaciondepago/comprobaciondepago.module').then( m => m.ComprobaciondepagoPageModule)
  },
  {
    path: 'verificarpago',
    loadChildren: () => import('./verificarpago/verificarpago.module').then( m => m.VerificarpagoPageModule)
  },
  {
    path: 'membresias',
    loadChildren: () => import('./membresias/membresias.module').then( m => m.MembresiasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
