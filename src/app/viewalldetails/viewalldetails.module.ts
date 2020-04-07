import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewalldetailsPageRoutingModule } from './viewalldetails-routing.module';

import { ViewalldetailsPage } from './viewalldetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewalldetailsPageRoutingModule
  ],
  declarations: [ViewalldetailsPage]
})
export class ViewalldetailsPageModule {}
