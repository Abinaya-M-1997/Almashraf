import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProofModalPage } from './proof-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProofModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProofModalPageRoutingModule {}
