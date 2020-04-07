import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatemodelsPage } from './statemodels.page';

const routes: Routes = [
  {
    path: '',
    component: StatemodelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatemodelsPageRoutingModule {}
