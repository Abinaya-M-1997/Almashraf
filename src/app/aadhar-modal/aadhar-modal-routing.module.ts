import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AadharModalPage } from './aadhar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AadharModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AadharModalPageRoutingModule {}
