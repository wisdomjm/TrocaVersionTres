import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarpagoPageRoutingModule } from './verificarpago-routing.module';

import { VerificarpagoPage } from './verificarpago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarpagoPageRoutingModule
  ],
  declarations: [VerificarpagoPage]
})
export class VerificarpagoPageModule {}
