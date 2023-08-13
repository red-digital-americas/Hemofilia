import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AboutComponent } from './about/about.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { HomeComponent } from './home/home.component';
import { MedicalNetworkComponent } from './medical-network/medical-network.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResultDiagnosticComponent } from './result-diagnostic/result-diagnostic.component';
import { TerminosComponent } from './terminos/terminos.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { EducacionMedicaComponent } from './educacion-medica/educacion-medica.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'patrocinadores', // child route path
    component: PatrocinadoresComponent, // child route component that the router renders
  },
  {
    path: 'result-diagnostic/:id',
    component: ResultDiagnosticComponent, // another child route component that the router renders
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
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
    path: 'diagnostico',
    component: DiagnosticComponent,
  },
  {
    path: 'medical-network/:id',
    component: MedicalNetworkComponent,
  },
  {
    path: 'educacion',
    component: EducacionMedicaComponent,
  },
  {
    path: 'terminos',
    component: TerminosComponent,
  },

  {
    path: 'perfil', // child route path
    component: PerfilComponent, // child route component that the router renders
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDoctorRoutingModule { }
