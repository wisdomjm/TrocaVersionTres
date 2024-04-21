import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarproductoPageRoutingModule } from './buscarproducto-routing.module';

import { BuscarproductoPage } from './buscarproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarproductoPageRoutingModule
  ],
  declarations: [BuscarproductoPage]
})
export class BuscarproductoPageModule {}
