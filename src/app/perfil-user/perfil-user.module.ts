import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HomeComponent } from './home/home.component';
import { TerminosComponent } from './terminos/terminos.component';
import { AboutComponent } from './about/about.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { PerfilUserRoutingModule } from './perfil-user-routing.module';

@NgModule({
  declarations:
    [
      HomeComponent,
      AboutComponent,
      PatrocinadoresComponent,
      TerminosComponent,
    ],
  imports: [
    // RouterModule.forChild(perfilUserRoutingModule),
    PerfilUserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
  ],
  providers:
    [
      {
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy
      },
      DatePipe
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PerfilUserModule { }
