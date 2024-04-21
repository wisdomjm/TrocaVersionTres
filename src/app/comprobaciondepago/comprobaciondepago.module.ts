import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprobaciondepagoPageRoutingModule } from './comprobaciondepago-routing.module';

import { ComprobaciondepagoPage } from './comprobaciondepago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprobaciondepagoPageRoutingModule
  ],
  declarations: [ComprobaciondepagoPage]
})
export class ComprobaciondepagoPageModule {}
