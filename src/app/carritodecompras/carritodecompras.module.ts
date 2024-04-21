import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritodecomprasPageRoutingModule } from './carritodecompras-routing.module';

import { CarritodecomprasPage } from './carritodecompras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritodecomprasPageRoutingModule
  ],
  declarations: [CarritodecomprasPage]
})
export class CarritodecomprasPageModule {}
