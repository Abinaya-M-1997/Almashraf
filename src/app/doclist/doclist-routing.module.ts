import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoclistPage } from './doclist.page';

const routes: Routes = [
  {
    path: '',
    component: DoclistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoclistPageRoutingModule {}
