import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelDocImagePage } from './model-doc-image.page';

const routes: Routes = [
  {
    path: '',
    component: ModelDocImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelDocImagePageRoutingModule {}
