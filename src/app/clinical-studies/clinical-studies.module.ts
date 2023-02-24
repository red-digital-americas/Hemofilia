import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicalStudiesPageRoutingModule } from './clinical-studies-routing.module';

import { ClinicalStudiesPage } from './clinical-studies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicalStudiesPageRoutingModule
  ],
  declarations: [ClinicalStudiesPage]
})
export class ClinicalStudiesPageModule {}
