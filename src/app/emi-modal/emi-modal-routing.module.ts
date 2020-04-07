import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmiModalPage } from './emi-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmiModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmiModalPageRoutingModule {}
