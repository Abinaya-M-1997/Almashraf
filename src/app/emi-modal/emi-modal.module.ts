import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmiModalPageRoutingModule } from './emi-modal-routing.module';

import { EmiModalPage } from './emi-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    EmiModalPageRoutingModule
  ],
  declarations: [EmiModalPage]
})
export class EmiModalPageModule {}
