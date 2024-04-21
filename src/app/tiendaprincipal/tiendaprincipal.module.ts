import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaprincipalPageRoutingModule } from './tiendaprincipal-routing.module';

import { TiendaprincipalPage } from './tiendaprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaprincipalPageRoutingModule
  ],
  declarations: [TiendaprincipalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TiendaprincipalPageModule {}
