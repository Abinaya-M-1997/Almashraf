import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanModalPage } from './pan-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PanModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanModalPageRoutingModule {}
