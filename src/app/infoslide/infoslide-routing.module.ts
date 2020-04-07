import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoslidePage } from './infoslide.page';

const routes: Routes = [
  {
    path: '',
    component: InfoslidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoslidePageRoutingModule {}
