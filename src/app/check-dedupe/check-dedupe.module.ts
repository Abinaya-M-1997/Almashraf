import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CheckDedupePageRoutingModule } from './check-dedupe-routing.module';

import { CheckDedupePage } from './check-dedupe.page';
import { DedupeDetailPageModule } from '../dedupe-detail/dedupe-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CheckDedupePageRoutingModule,
    DedupeDetailPageModule
  ],
  declarations: [CheckDedupePage]
})
export class CheckDedupePageModule {}
