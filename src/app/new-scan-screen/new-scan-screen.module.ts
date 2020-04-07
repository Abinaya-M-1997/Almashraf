import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewScanScreenPageRoutingModule } from './new-scan-screen-routing.module';

import { NewScanScreenPage } from './new-scan-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewScanScreenPageRoutingModule
  ],
  declarations: [NewScanScreenPage]
})
export class NewScanScreenPageModule {}
