import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalNetworkPageRoutingModule } from './medical-network-routing.module';

import { MedicalNetworkPage } from './medical-network.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalNetworkPageRoutingModule
  ],
  declarations: [MedicalNetworkPage]
})
export class MedicalNetworkPageModule {}
