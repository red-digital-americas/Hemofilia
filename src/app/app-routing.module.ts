import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TerminosComponent } from './terminos/terminos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'patrocinadores',
    component: PatrocinadoresComponent
  },
  {
    path: 'terminos-y-condiciones',
    component: TerminosComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent
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
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
