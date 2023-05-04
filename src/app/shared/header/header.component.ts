import { Component, OnInit, Input } from '@angular/core';
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
  @Input() menu: string;

  public appPagesNoUser = [
    { title: 'Home', url: '/perfil-user/home', icon: 'home' },
    { title: 'Quiénes somos', url: '/perfil-user/about', icon: 'body' },
    { title: 'Patrocinadores', url: '/perfil-user/patrocinadores', icon: 'people' },
    { title: 'Acerca de', url: '/perfil-user/acerca-de', icon: 'information' },
    { title: 'Login', url: '/perfil-user/login', icon: 'key' },

  ];
  public appPagesUser = [
    { title: 'Home', url: '/perfil-doctor/home', icon: 'home', status: 'true' },
    { title: 'Quiénes somos', url: '/perfil-doctor/about', icon: 'body', status: 'true' },
    { title: 'Ir al Diagnóstico Temprano', url: '/perfil-doctor/diagnostico', icon: 'document', status: 'false' },
    // { title: 'Estudios clínicos', url: 'clinical-studies', icon: 'reader' },
    { title: 'Red Médica', url: '/perfil-doctor/medical-network/0', icon: 'pulse', status: 'false' },
    { title: 'Patrocinadores', url: '/perfil-doctor/patrocinadores', icon: 'people', status: 'true' },
    // { title: 'Login', url: '/login', icon: 'key', status: 'true' },
    { title: 'Perfil', url: '/perfil-doctor/perfil', icon: 'person', status: 'false' },
    { title: 'Acerca de', url: '/perfil-doctor/acerca-de', icon: 'information', status: 'false' },


  ];
  public user: any;
  public userRol = false;

  public title = '';
  public body = '';
  constructor(private activatedRoute: ActivatedRoute, public router: Router,
    private popoverCtrl: PopoverController, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    if(this.user === null){
      this.userRol = false;
    }
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    if (this.user === null) {
      this.userRol = false;
    }
    this.menuChange2();
  }
  menuChange2(){
    if (this.user === null){
      this.userRol = false;
    }
    else{
      this.userRol = true;
    }
  }
  menuChange(){
    if (this.user === null){
      this.userRol = false;
    }
    else{
      this.userRol = true;
    }
    this.ngOnInit();
  }
  logout() {
    console.log('cerrar session');
    this.title = 'Cerrar Sesión';
    this.body = 'Hasta pronto';
    this.message(this.title, this.body);
    this.router.navigateByUrl('/perfil-user/login');
    localStorage.removeItem('userData');
    this.ngOnInit();
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

