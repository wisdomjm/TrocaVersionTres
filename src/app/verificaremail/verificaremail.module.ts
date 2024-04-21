import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificaremailPageRoutingModule } from './verificaremail-routing.module';

import { VerificaremailPage } from './verificaremail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificaremailPageRoutingModule
  ],
  declarations: [VerificaremailPage]
})
export class VerificaremailPageModule {}
