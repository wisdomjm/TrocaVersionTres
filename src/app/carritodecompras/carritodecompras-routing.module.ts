import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritodecomprasPage } from './carritodecompras.page';

const routes: Routes = [
  {
    path: '',
    component: CarritodecomprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritodecomprasPageRoutingModule {}
