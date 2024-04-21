import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembresiasPage } from './membresias.page';

const routes: Routes = [
  {
    path: '',
    component: MembresiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembresiasPageRoutingModule {}
