import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'viewalldetails',
    loadChildren: () => import('./viewalldetails/viewalldetails.module').then( m => m.ViewalldetailsPageModule)
  },
  {
    path: 'popup-modal',
    loadChildren: () => import('./popup-modal/popup-modal.module').then( m => m.PopupModalPageModule)
  },
  {
    path: 'scan-type',
    loadChildren: () => import('./scan-type/scan-type.module').then( m => m.ScanTypePageModule)
  },
  {
    path: 'new-scan-screen',
    loadChildren: () => import('./new-scan-screen/new-scan-screen.module').then( m => m.NewScanScreenPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'master-update',
    loadChildren: () => import('./master-update/master-update.module').then( m => m.MasterUpdatePageModule)
  },
  {
    path: 'aadhar-modal',
    loadChildren: () => import('./aadhar-modal/aadhar-modal.module').then( m => m.AadharModalPageModule)
  },
  {
    path: 'pan-modal',
    loadChildren: () => import('./pan-modal/pan-modal.module').then( m => m.PanModalPageModule)
  },
  {
    path: 'proof-modal',
    loadChildren: () => import('./proof-modal/proof-modal.module').then( m => m.ProofModalPageModule)
  },
  {
    path: 'emi-modal',
    loadChildren: () => import('./emi-modal/emi-modal.module').then( m => m.EmiModalPageModule)
  },
  {
    path: 'infoslide',
    loadChildren: () => import('./infoslide/infoslide.module').then( m => m.InfoslidePageModule)
  },
  {
    path: 'check-dedupe',
    loadChildren: () => import('./check-dedupe/check-dedupe.module').then( m => m.CheckDedupePageModule)
  },
  {
    path: 'doclist',
    loadChildren: () => import('./doclist/doclist.module').then( m => m.DoclistPageModule)
  },
  {
    path: 'show-image',
    loadChildren: () => import('./show-image/show-image.module').then( m => m.ShowImagePageModule)
  },
  {
    path: 'statemodels',
    loadChildren: () => import('./statemodels/statemodels.module').then( m => m.StatemodelsPageModule)
  },
  {
    path: 'viewdetails',
    loadChildren: () => import('./viewdetails/viewdetails.module').then( m => m.ViewdetailsPageModule)
  },
  {
    path: 'dedupe-detail',
    loadChildren: () => import('./dedupe-detail/dedupe-detail.module').then( m => m.DedupeDetailPageModule)
  },
  {
    path: 'submit',
    loadChildren: () => import('./submit/submit.module').then( m => m.SubmitPageModule)
  },
  {
    path: 'model-doc-image',
    loadChildren: () => import('./model-doc-image/model-doc-image.module').then( m => m.ModelDocImagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
