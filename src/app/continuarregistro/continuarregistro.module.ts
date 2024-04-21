import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinuarregistroPageRoutingModule } from './continuarregistro-routing.module';

import { ContinuarregistroPage } from './continuarregistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinuarregistroPageRoutingModule
  ],
  declarations: [ContinuarregistroPage]
})
export class ContinuarregistroPageModule {}
