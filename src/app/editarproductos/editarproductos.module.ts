import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarproductosPageRoutingModule } from './editarproductos-routing.module';

import { EditarproductosPage } from './editarproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarproductosPageRoutingModule
  ],
  declarations: [EditarproductosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarproductosPageModule {}
