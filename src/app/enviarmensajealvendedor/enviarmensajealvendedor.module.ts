import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarmensajealvendedorPageRoutingModule } from './enviarmensajealvendedor-routing.module';

import { EnviarmensajealvendedorPage } from './enviarmensajealvendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarmensajealvendedorPageRoutingModule
  ],
  declarations: [EnviarmensajealvendedorPage]
})
export class EnviarmensajealvendedorPageModule {}
