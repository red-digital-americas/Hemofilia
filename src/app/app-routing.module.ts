import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'hematopatias',
    loadChildren: () => import('./hematopatias/hematopatias.module').then( m => m.HematopatiasPageModule)
  },
  {
    path: 'clinical-studies',
    loadChildren: () => import('./clinical-studies/clinical-studies.module').then( m => m.ClinicalStudiesPageModule)
  },
  {
    path: 'medical-network',
    loadChildren: () => import('./medical-network/medical-network.module').then( m => m.MedicalNetworkPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
