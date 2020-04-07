import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewalldetailsPage } from './viewalldetails.page';

const routes: Routes = [
  {
    path: '',
    component: ViewalldetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewalldetailsPageRoutingModule {}
