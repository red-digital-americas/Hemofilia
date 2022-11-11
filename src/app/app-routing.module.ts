import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil-user/home',
    pathMatch: 'full'
  },
  {
    path: 'perfil-doctor',
    loadChildren: () =>
      import('./perfil-doctor/perfil-doctor.module').then(
        (m) => m.PerfilDoctorModule
      ),
  },
  {
    path: 'perfil-user',
    loadChildren: () =>
      import('./perfil-user/perfil-user.module').then(
        (m) => m.PerfilUserModule
      ),
  },
];
// export const APP_ROUTING = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [
  //   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  // ],
  exports: [RouterModule],
})
// eslint-disable-next-line eol-last
export class AppRoutingModule { }
