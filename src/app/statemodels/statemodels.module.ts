import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatemodelsPageRoutingModule } from './statemodels-routing.module';

import { StatemodelsPage } from './statemodels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatemodelsPageRoutingModule
  ],
  declarations: [StatemodelsPage]
})
export class StatemodelsPageModule {}
