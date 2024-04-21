import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaprincipalPageRoutingModule } from './mapaprincipal-routing.module';

import { MapaprincipalPage } from './mapaprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaprincipalPageRoutingModule
  ],
  declarations: [MapaprincipalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapaprincipalPageModule {}
