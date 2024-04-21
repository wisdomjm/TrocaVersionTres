import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginadepagoPage } from './paginadepago.page';

const routes: Routes = [
  {
    path: '',
    component: PaginadepagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginadepagoPageRoutingModule {}
