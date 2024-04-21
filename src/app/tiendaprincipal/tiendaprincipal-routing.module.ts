import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaprincipalPage } from './tiendaprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaprincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaprincipalPageRoutingModule {}
