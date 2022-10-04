import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-medical-network',
  templateUrl: './medical-network.page.html',
  styleUrls: ['./medical-network.page.scss'],
})
export class MedicalNetworkPage implements OnInit {
  public data;

  public title = '';
  public body = '';
  public catEspecialista: any[] = [];
  public catconsultorio: any[] = [];
  private callNumber: CallNumber;


  constructor(public service: ServiceGeneralService, private alertController: AlertController, public routerActive: ActivatedRoute,
    public router: Router) { }
  ionViewWillEnter() {
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.catalogsEspecialista();
    this.catalogsConstultorio();
    this.service.serviceGeneralGet(`User`).subscribe(resp => {
      if (resp.success) {
        this.data = resp.result;
        console.log('data', this.data);
      } else {
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
  visitTerminos() {
    window.open(
      'https://www.amlcc.org/Aviso-de-Privacidad-AMLCC.pdf',
      '_system',
      'location=no'
    );
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
  goTerminos() {
    this.router.navigateByUrl('terminos-y-condiciones');

  }
  call(numero) {
    // this.callNumber
    //   .callNumber(numero, true)
    //   .then((res) => console.log('Marcando.', res))
    //   .catch((err) => console.log('Error de llamada', err));
    const telNumber = numero;
    window.open(`tel:${telNumber}`, '_system');
  }
  catalogsEspecialista() {
    this.service
      .serviceGeneralGet(`CatSpeciality`)
      .subscribe((resp) => {
        if (resp.success) {
          this.catEspecialista = resp.result;
          console.log('catEspecialista', this.catEspecialista);
        }
      });
  }
  catalogsConstultorio() {
    this.service
      .serviceGeneralGet(`CatConsultorio`)
      .subscribe((resp) => {
        if (resp.success) {
          this.catconsultorio = resp.result;
          console.log('catconsultorio', this.catconsultorio);
        }
      });
  }
  getNameSpecial(id) {
    console.log('id', id);
    if (id != null) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.catEspecialista.length; i++) {
        if (this.catEspecialista[i].id === id) {
          return this.catEspecialista[i].speciality;
        }
      }
    }
    else {
      return 'S/N';
    }
  }
  getNameConsul(id) {
    if (id != null) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.catconsultorio.length; i++) {
        if (this.catconsultorio[i].id === id) {
          return this.catconsultorio[i].consultorio;
        }
      }
    }
    else {
      return 'S/N';
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


}
