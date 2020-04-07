import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoclistPageRoutingModule } from './doclist-routing.module';

import { DoclistPage } from './doclist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoclistPageRoutingModule
  ],
  declarations: [DoclistPage]
})
export class DoclistPageModule {}
