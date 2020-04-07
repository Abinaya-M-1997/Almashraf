import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewdetailsPageRoutingModule } from './viewdetails-routing.module';

import { ViewdetailsPage } from './viewdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewdetailsPageRoutingModule
  ],
  declarations: [ViewdetailsPage]
})
export class ViewdetailsPageModule {}
