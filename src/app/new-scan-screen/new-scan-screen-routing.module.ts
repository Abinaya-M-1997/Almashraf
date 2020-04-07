import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewScanScreenPage } from './new-scan-screen.page';

const routes: Routes = [
  {
    path: '',
    component: NewScanScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewScanScreenPageRoutingModule {}
