import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfildeusuarioPage } from './perfildeusuario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfildeusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfildeusuarioPageRoutingModule {}
