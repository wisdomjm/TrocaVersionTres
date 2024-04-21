import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaprincipalPage } from './mapaprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: MapaprincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaprincipalPageRoutingModule {}
