import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicalStudiesPage } from './clinical-studies.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicalStudiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicalStudiesPageRoutingModule {}
