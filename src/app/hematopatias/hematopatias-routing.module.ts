import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HematopatiasPage } from './hematopatias.page';

const routes: Routes = [
  {
    path: '',
    component: HematopatiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HematopatiasPageRoutingModule {}
