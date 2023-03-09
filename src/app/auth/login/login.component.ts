import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/servises/login/login.service';
import { DialogGeneralMessageComponent } from 'src/app/dialog/dialog-general-message/dialog-general-message.component';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public disabled = false;
  showPassport = false;
  loginForm: any;
  resertForm: any;
  public email: string;
  public password: string;
  public dataProfile: any;
  public validar = false;
  eyed = false;
  public title = '';
  public body = '';
  public typeInput = 'password';
  constructor(public platform: Platform,
    public router: Router,
    public service: LoginService,
    public modalController: ModalController, private alertController: AlertController) { }

  ionViewWillEnter() {
    console.log('pass', this.password);
  }

  ngOnInit() { }

  back() {
    console.log('regresar');
    this.router.navigateByUrl('/perfil-user/home');

  }

  forgotPassword() {
    this.router.navigateByUrl('/perfil-user/forgot-password');
  }
  public viewPassword(type) {
    if (type === true) {
      this.typeInput = 'text';
      this.eyed = true;
    } else {
      this.typeInput = 'password';
      this.eyed = false;
    }
  }
  login(correo, contrasena) {
    this.disabled = true;
    // User/Login?email=lucero.vargas%40zumit.tech&password=123
    const loginObj = `?email=${correo}&password=${contrasena}`;
    this.service.login(loginObj).subscribe(
      (resp) => {
        console.log(resp);
        if (resp.success) {
          this.disabled = false;
          this.dataProfile = resp.result;
          console.log('data profile', this.dataProfile);
          localStorage.setItem('userData', JSON.stringify(this.dataProfile));
          // this.loader.loadingDismiss();
          console.log('login', resp);
          this.title = 'Exito';
          this.body = 'Haz iniciado sesion';
          this.message(this.title, this.body);
          this.router.navigateByUrl('/perfil-doctor/home');
          // this.router.navigateByUrl('home');
          this.ionViewWillEnter();

        } else {
          this.disabled = false;
          this.title = 'Error';
          this.message(this.title, resp.message);
        }
      },
      (error) => {
        this.disabled = false;
        console.log(error);
        this.message(this.title, error.error.message);
      }
    );
  }
 
  createUser() {
    console.log('create user');
    this.router.navigateByUrl('/perfil-user/create-user');

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

// this.router.navigateByUrl('bienvenido');

