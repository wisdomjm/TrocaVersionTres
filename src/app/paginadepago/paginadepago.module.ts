import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginadepagoPageRoutingModule } from './paginadepago-routing.module';

import { PaginadepagoPage } from './paginadepago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginadepagoPageRoutingModule
  ],
  declarations: [PaginadepagoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginadepagoPageModule {}
