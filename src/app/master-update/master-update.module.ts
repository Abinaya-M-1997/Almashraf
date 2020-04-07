import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterUpdatePageRoutingModule } from './master-update-routing.module';

import { MasterUpdatePage } from './master-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterUpdatePageRoutingModule
  ],
  declarations: [MasterUpdatePage]
})
export class MasterUpdatePageModule {}
