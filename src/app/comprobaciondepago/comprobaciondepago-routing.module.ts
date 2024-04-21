import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprobaciondepagoPage } from './comprobaciondepago.page';

const routes: Routes = [
  {
    path: '',
    component: ComprobaciondepagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprobaciondepagoPageRoutingModule {}
