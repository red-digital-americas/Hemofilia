import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-medical-network',
  templateUrl: './medical-network.component.html',
  styleUrls: ['./medical-network.component.scss'],
})
export class MedicalNetworkComponent implements OnInit {

  public data;
  public today = new Date();

  public idPeticion = '';
  public title = '';
  public body = '';
  public catEspecialista: any[] = [];
  public catconsultorio: any[] = [];
  public user: any;
  private callNumber: CallNumber;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  constructor(public service: ServiceGeneralService, private alertController: AlertController, public routerActive: ActivatedRoute,
    public router: Router) { }
  ionViewWillEnter() {
    this.getData();
  }

  ngOnInit() {
    console.log(this.routerActive.snapshot.paramMap.get('id'));
    this.idPeticion = this.routerActive.snapshot.paramMap.get('id');
    console.log('idPeticion', this.idPeticion);
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  getData() {
    const numeroDia = this.today.getDay();
    const nombreDia = this.dias[numeroDia];
    console.log('today', nombreDia);
    this.catalogsEspecialista();
    this.catalogsConstultorio();
    // aqui se pone null por que siempre se mostrara los hematologicos
    if (this.idPeticion === 'null') {
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
    else if (this.idPeticion !== 'null') {
      // User/medic-available
      // User/all-by-speciality?speciality=${1}
      this.service.serviceGeneralGet(`User/medic-available`).subscribe(resp => {
        if (resp.success) {
          const res = resp.result;
          res.forEach(element => {
            element.weeklySchedules.forEach(dia => {
              if(dia === nombreDia){
                this.data.push(element);
              }
            });
          });
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
    this.router.navigateByUrl('/perfil-doctor/terminos');

  }
  call(numero) {
    // this.callNumber
    //   .callNumber(numero, true)
    //   .then((res) => console.log('Marcando.', res))
    //   .catch((err) => console.log('Error de llamada', err));
    const telNumber = numero;
    window.open(`tel:${telNumber}`, '_system');
    if (this.idPeticion === '1') {
      this.postCall();
    }
  }
  postCall() {
    const data = {
      userId: this.user.id,
      eventType: 1
    };
    this.service
      .serviceGeneralPostWithUrl(`RequestSupport`, data)
      .subscribe((resp) => {
        if (resp.success) {
          console.log('llamada registrada');
        }
      });
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

