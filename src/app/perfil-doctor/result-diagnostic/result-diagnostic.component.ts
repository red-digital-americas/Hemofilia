import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-result-diagnostic',
  templateUrl: './result-diagnostic.component.html',
  styleUrls: ['./result-diagnostic.component.scss'],
})
export class ResultDiagnosticComponent implements OnInit {
  public idResult;
  public data;
  public title = '';
  public body = '';

  constructor(public router: Router,
    public service: ServiceGeneralService, private alertController: AlertController, public routerActive: ActivatedRoute,) { }
  ionViewWillEnter() {
    console.log(this.routerActive.snapshot.paramMap.get('id'));
    this.idResult = this.routerActive.snapshot.paramMap.get('id');
    this.getData();
  }

  ngOnInit() {
    this.idResult = this.routerActive.snapshot.paramMap.get('id');
    // this.getData();
  }
  back() {
    console.log('regresar');
    this.router.navigateByUrl('/perfil-doctor/diagnostico');

  }
  home() {
    console.log('home');
    this.router.navigateByUrl('/perfil-doctor/home');

  }
  getData() {
    if (this.idResult !== null) {
      this.service.serviceGeneralGet(`ResultQuiz/${this.idResult}`).subscribe(resp => {
        if (resp.success) {
          this.data = resp.result;
          console.log('data', this.data);
        }
        else {
          this.title = 'Error';
          this.message(this.title, resp.message);
        }
      },
        (error) => {
          console.log(error);
          this.title = 'Error';
          this.message(this.title, error.error.message);
        });
    }
    else {
      this.data = undefined;
    }
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
  especialistas(){
    this.router.navigateByUrl('/perfil-doctor/medical-network');

  }
  goTerminos() {
    this.router.navigateByUrl('/perfil-doctor/terminos');

  }
  facebook() {
    window.open(
      'https://www.facebook.com/amlccorg',
      '_system',
      'location=no'
    );
  }
  instagram() {
    window.open(
      'https://www.instagram.com/amlccorg',
      '_system',
      'location=no'
    );
  }
  twitter() {
    window.open(
      'http://www.twitter.com/amlccorg',
      '_system',
      'location=no'
    );
  }

}