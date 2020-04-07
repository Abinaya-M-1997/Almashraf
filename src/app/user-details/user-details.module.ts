import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsPageRoutingModule } from './user-details-routing.module';

import { UserDetailsPage } from './user-details.page';
import { EmiModalPageModule } from '../emi-modal/emi-modal.module';
//import { PanModalPage } from '../pan-modal/pan-modal.page';
//import { ShowImagePage } from '../show-image/show-image.page';
//import { AadharModalPage } from '../aadhar-modal/aadhar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailsPageRoutingModule,
    ReactiveFormsModule,
    EmiModalPageModule
  ],
  declarations: [UserDetailsPage],
  entryComponents: []
})
export class UserDetailsPageModule {}
