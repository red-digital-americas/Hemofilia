import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HematopatiasPageRoutingModule } from './hematopatias-routing.module';

import { HematopatiasPage } from './hematopatias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HematopatiasPageRoutingModule
  ],
  declarations: [HematopatiasPage]
})
export class HematopatiasPageModule {}
