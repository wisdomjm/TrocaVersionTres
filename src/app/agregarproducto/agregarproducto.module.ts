import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarproductoPageRoutingModule } from './agregarproducto-routing.module';

import { AgregarproductoPage } from './agregarproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarproductoPageRoutingModule
  ],
  declarations: [AgregarproductoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarproductoPageModule {}
