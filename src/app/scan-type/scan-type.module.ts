import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanTypePageRoutingModule } from './scan-type-routing.module';

import { ScanTypePage } from './scan-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanTypePageRoutingModule
  ],
  declarations: [ScanTypePage]
})
export class ScanTypePageModule {}
