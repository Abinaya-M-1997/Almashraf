import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DedupeDetailPageRoutingModule } from './dedupe-detail-routing.module';

import { DedupeDetailPage } from './dedupe-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DedupeDetailPageRoutingModule
  ],
  declarations: [DedupeDetailPage]
})
export class DedupeDetailPageModule {}
