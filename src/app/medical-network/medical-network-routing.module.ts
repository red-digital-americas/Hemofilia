import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalNetworkPage } from './medical-network.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalNetworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalNetworkPageRoutingModule {}
