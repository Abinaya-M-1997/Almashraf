import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckDedupePage } from './check-dedupe.page';

const routes: Routes = [
  {
    path: '',
    component: CheckDedupePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckDedupePageRoutingModule {}
