import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanModalPageRoutingModule } from './pan-modal-routing.module';

import { PanModalPage } from './pan-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanModalPageRoutingModule
  ],
  declarations: [PanModalPage]
})
export class PanModalPageModule {}
