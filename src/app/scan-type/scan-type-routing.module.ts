import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanTypePage } from './scan-type.page';

const routes: Routes = [
  {
    path: '',
    component: ScanTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanTypePageRoutingModule {}
