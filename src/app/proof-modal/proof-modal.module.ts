import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofModalPageRoutingModule } from './proof-modal-routing.module';

import { ProofModalPage } from './proof-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofModalPageRoutingModule
  ],
  declarations: [ProofModalPage]
})
export class ProofModalPageModule {}
