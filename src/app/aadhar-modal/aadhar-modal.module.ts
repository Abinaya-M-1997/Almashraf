import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AadharModalPageRoutingModule } from './aadhar-modal-routing.module';

import { AadharModalPage } from './aadhar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AadharModalPageRoutingModule
  ],
  declarations: [AadharModalPage]
})
export class AadharModalPageModule {}
