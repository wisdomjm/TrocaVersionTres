import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfildeusuarioPageRoutingModule } from './perfildeusuario-routing.module';

import { PerfildeusuarioPage } from './perfildeusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfildeusuarioPageRoutingModule
  ],
  declarations: [PerfildeusuarioPage]
})
export class PerfildeusuarioPageModule {}
