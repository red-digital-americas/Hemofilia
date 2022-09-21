import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public appPagesNoUser = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Quiénes somos', url: '/about', icon: 'body' },
    { title: 'Patrocinadores', url: 'patrocinadores', icon: 'people' },
    { title: 'Login', url: '/login', icon: 'key' },
  ];
  public appPagesUser = [
    { title: 'Home', url: '/home', icon: 'home', status: 'true' },
    { title: 'Quiénes somos', url: '/about', icon: 'body', status: 'true' },
    { title: 'Ir al Diagnóstico Temprano', url: 'hematopatias', icon: 'document', status: 'false' },
    // { title: 'Estudios clínicos', url: 'clinical-studies', icon: 'reader' },
    { title: 'Red Médica', url: 'medical-network', icon: 'pulse', status: 'false' },
    { title: 'Patrocinadores', url: 'patrocinadores', icon: 'people', status: 'true' },
    // { title: 'Login', url: '/login', icon: 'key', status: 'true' },
    { title: 'Perfil', url: '/perfil', icon: 'person', status: 'false' },

  ];
  public user: any;
  public title = '';
  public body = '';
  constructor(private activatedRoute: ActivatedRoute, public router: Router,
    private popoverCtrl: PopoverController, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
  }
  logout() {
    console.log('cerrar session');
    this.title = 'Cerrar Sesión';
    this.body = 'Hasta pronto';
    this.message(this.title, this.body);
    this.router.navigateByUrl('login');
    localStorage.removeItem('userData');

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

