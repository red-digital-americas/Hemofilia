/* eslint-disable max-len */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { TerminosComponent } from './terminos/terminos.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { DialogGeneralMessageComponent } from './dialog/dialog-general-message/dialog-general-message.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, LoginComponent, ForgotPasswordComponent, CreateUserComponent, DialogGeneralMessageComponent, TerminosComponent, PerfilComponent, PatrocinadoresComponent, ChangePasswordComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
