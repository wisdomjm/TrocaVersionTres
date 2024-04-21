import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembresiasPageRoutingModule } from './membresias-routing.module';

import { MembresiasPage } from './membresias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembresiasPageRoutingModule
  ],
  declarations: [MembresiasPage]
})
export class MembresiasPageModule {}
