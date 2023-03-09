import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from '../auth/create-user/create-user.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { TerminosComponent } from './terminos/terminos.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'patrocinadores', // child route path
    component: PatrocinadoresComponent, // child route component that the router renders
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'acerca-de',
    component: AcercaDeComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'terminos',
    component: TerminosComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
];
@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule],
})
export class PerfilUserRoutingModule { }
