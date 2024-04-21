import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarmensajealvendedorPage } from './enviarmensajealvendedor.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarmensajealvendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarmensajealvendedorPageRoutingModule {}
