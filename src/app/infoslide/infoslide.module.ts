import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoslidePageRoutingModule } from './infoslide-routing.module';

import { InfoslidePage } from './infoslide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoslidePageRoutingModule
  ],
  declarations: [InfoslidePage]
})
export class InfoslidePageModule {}
