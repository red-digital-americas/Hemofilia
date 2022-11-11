import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil/perfil.component';
import { ResultDiagnosticComponent } from './result-diagnostic/result-diagnostic.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { AboutComponent } from './about/about.component';
import { TerminosComponent } from './terminos/terminos.component';
import { HomeComponent } from './home/home.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MedicalNetworkComponent } from './medical-network/medical-network.component';
import { PerfilDoctorRoutingModule } from './perfil-doctor-routing.module';

@NgModule({
  declarations:
    [
      PerfilComponent,
      ResultDiagnosticComponent,
      PatrocinadoresComponent,
      DiagnosticComponent,
      AboutComponent,
      TerminosComponent,
      HomeComponent,
      TerminosComponent,
      MedicalNetworkComponent,
    ],
  imports:
    [
      CommonModule,
      IonicModule,
      FormsModule,
      PerfilDoctorRoutingModule,
      ReactiveFormsModule,
    ],
  providers: [CallNumber],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerfilDoctorModule { }
