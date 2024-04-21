import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificaremailPage } from './verificaremail.page';

const routes: Routes = [
  {
    path: '',
    component: VerificaremailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificaremailPageRoutingModule {}
