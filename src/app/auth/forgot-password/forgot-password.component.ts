import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { LoginService } from 'src/app/core/servises/login/login.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public showHeader = false;
  public email: string;
  public title = '';
  public body = '';


  constructor(public platform: Platform,
    public router: Router,
    public service: LoginService, private alertController: AlertController) { }

  ngOnInit() { }
  iniciarSesion() {
    this.router.navigateByUrl('/perfil-user/login');
  }
  forgot(email: string) {
    console.log('recuperar contraseña');
    const obj = `?email=${email}`;
    this.service.forgotPassword(obj).subscribe(
      (resp) => {
        if (resp.success) {
          console.log('forgot', resp);
          this.title = 'Exito';
          this.body = 'Recibiras un correo para restablecer tu contraseña';
          this.message(this.title, this.body);

        } else {
          this.title = 'Error';
          this.message(this.title, resp.message);
        }
      },
      (error) => {
        console.log(error);
        this.title = 'Error';
        this.message(this.title, error.error.message);
      }
    );
  }
  async message(title, body) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: e.header,
      message: body,
      buttons: ['OK'],
      mode: 'ios',
    });

    await alert.present();

  }

}
