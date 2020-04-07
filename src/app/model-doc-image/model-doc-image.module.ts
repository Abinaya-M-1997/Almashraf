import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelDocImagePageRoutingModule } from './model-doc-image-routing.module';

import { ModelDocImagePage } from './model-doc-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelDocImagePageRoutingModule
  ],
  declarations: [ModelDocImagePage]
})
export class ModelDocImagePageModule {}
