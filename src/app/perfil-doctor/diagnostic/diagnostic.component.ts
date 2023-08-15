import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss'],
})
export class DiagnosticComponent implements OnInit {

  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  public sex;
  public habita;
  public hemoglobina;
  public plaquetas;
  public neutrofilos;
  public linfocitos;
  public volumen;
  public deshidrogenasa;
  // public data: any;
  public data: DataModel = new DataModel();
  public dataSave = false;
  public dataSintomas = false;
  public dataEstudios = false;


  public cOption = [];
  public cSintomas = [];
  public cEstudios = [];
  public symptomId = null;
  public laboratoryTestId = null;


  public title = '';
  public body = '';
  public today = new Date();
  public user: any;
  public disabledGuardar = false;

  // eslint-disable-next-line max-len
  constructor(private loadingCtrl: LoadingController, public router: Router, public service: ServiceGeneralService, private alertController: AlertController,
  ) { }
  ionViewWillEnter() {
    this.slides.slideTo(0);
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    this.getCatOpcion();
  }
  ngOnInit() {
    this.slides.slideTo(0);
    this.disabledGuardar = false;
    this.data.symptomId = null;
    this.data.laboratoryTestId = null;
    this.data.laboratoryTestOther = '';


    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    this.getCatOpcion();
    this.catEstudios();
    this.catSintomas();

  }
  catSintomas() {
    this.service.serviceGeneralGet('CatSymptom').subscribe(resp => {
      if (resp.success) {
        this.cSintomas = resp.result;
        this.cSintomas.forEach(element => {
          element.status = false;
        });
        console.log('sintomas', this.cSintomas);
      }
    });
  }
  catEstudios() {
    this.service.serviceGeneralGet('CatLaboratoryTest').subscribe(resp => {
      if (resp.success) {
        this.cEstudios = resp.result;
        this.cEstudios.forEach(element => {
          element.status = false;
        });
        console.log('estudios', this.cEstudios);
      }
    });
  }
  getCatOpcion() {
    this.service.serviceGeneralGet(`CatOptionDiagnostic`).subscribe(resp => {
      if (resp.success) {
        this.cOption = resp.result;
        this.cOption.forEach(element => {
          element.status = false;
        });
        console.log('catOpcion', this.cOption);
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }
  back() {
    console.log('regresar');
    this.router.navigateByUrl('/perfil-doctor/home');
    this.slides.slideTo(0);
    this.ngOnInit();

  }
  swipeNext() {
    this.slides.slideNext();

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

  save() {
    this.disabledGuardar = true;
    let nameTemp = '';
    this.data.results = [];
    this.cOption.forEach(element => {
      if (element.status === true) {
        if (nameTemp === '') {
          nameTemp = `${element.clave}`;
        }
        else {
          nameTemp = `${nameTemp}+${element.clave}`;
        }
        this.data.results.push(
          {
            id: 0,
            quizId: 0,
            userId: this.user.id,
            optionId: element.id,
            createdDate: this.today,
            status: true
          }
        );
      }
      element.status = false;
    });
    this.data.name = nameTemp;
    this.data.textResult = nameTemp;
    this.data.result = true;
    this.data.createdDate = this.today;
    this.data.initialDataId = null;
    console.log('data', this.data);
    if (this.data.results.length !== 0) {
      console.log('data', this.data);

      this.service.serviceGeneralPostWithUrl('Quiz', this.data).subscribe(resp => {
        if (resp.success) {
          this.dataSave = true;
          this.slides.slideNext();
          setTimeout(() => {
            this.router.navigateByUrl(`/perfil-doctor/result-diagnostic/${resp.result.id}`);
            this.disabledGuardar = false;
            this.ngOnInit();
          }, 5000);
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
      this.message('Error', 'Vuelve a intentarlo');
      this.ngOnInit();
      this.slides.slideTo(0);
    }
  }
  public prev() {
    this.slides.slidePrev();
  }
  sintomasValue(value) {
    console.log('sintoma value', value);
    this.cSintomas.forEach(element => {
      if (element.id !== value.id) {
        element.status = false;
      }
      else {
        if (value.status === true) {
          this.data.symptomId = value.id;
        }
        else {
          this.data.symptomId = null;
        }
      }
    });
    console.log('sintoma value', this.data.symptomId);
  }
  laboratoryValue(value) {
    // eslint-disable-next-line max-len
    const body = 'Para validar los posibles resultados, le recomendamos indicar a su paciente realizarse una Biometria Hematica y/o una Quimica Sanguinea.';
    const title = 'Importante';
    console.log('laboratory', value);
    this.cEstudios.forEach(element => {
      if (element.id !== value.id) {
        element.status = false;
      }
      else {
        if (value.status === true) {
          this.data.laboratoryTestId = value.id;
          if (value.laboratoryTest === 'Otro(s)' || value.laboratoryTest === 'Ninguno') {
            this.messageHema(title, body);

          }
        }
        else {
          this.data.laboratoryTestId = null;
        }
      }
    });
    console.log('laboratory', this.data.laboratoryTestId);
  }

  sexValueOp(value) {
    console.log('sex', value);
    if (value.id === 2) {
      this.cOption[0].status = true;
      this.cOption[1].status = false;
      this.cOption[2].status = false;
    }
    else if (value.id === 3) {
      this.cOption[0].status = false;
      this.cOption[1].status = true;
      this.cOption[2].status = false;
    }
    else if (value.id === 4) {
      this.cOption[0].status = false;
      this.cOption[1].status = false;
      this.cOption[2].status = true;
    }
  }
  habitaValueOp(value) {
    console.log('sex', value);
    if (value.id === 5) {
      this.cOption[3].status = true;
      this.cOption[4].status = false;
      this.cOption[5].status = false;
    }
    else if (value.id === 7) {
      this.cOption[3].status = false;
      this.cOption[4].status = true;
      this.cOption[5].status = false;
    }
    else if (value.id === 8) {
      this.cOption[3].status = false;
      this.cOption[4].status = false;
      this.cOption[5].status = true;
    }
  }
  hemoglobinaValueOp(value) {
    console.log('hemoglobina', value);
    if (value.id === 9) {
      this.cOption[6].status = true;
      this.cOption[7].status = false;
      this.cOption[8].status = false;
      this.cOption[9].status = false;
      this.cOption[10].status = false;
      this.cOption[11].status = false;
    }
    else if (value.id === 10) {
      this.cOption[6].status = false;
      this.cOption[7].status = true;
      this.cOption[8].status = false;
      this.cOption[9].status = false;
      this.cOption[10].status = false;
      this.cOption[11].status = false;
    }
    else if (value.id === 11) {
      this.cOption[6].status = false;
      this.cOption[7].status = false;
      this.cOption[8].status = true;
      this.cOption[9].status = false;
      this.cOption[10].status = false;
      this.cOption[11].status = false;
    }
    else if (value.id === 12) {
      this.cOption[6].status = false;
      this.cOption[7].status = false;
      this.cOption[8].status = false;
      this.cOption[9].status = true;
      this.cOption[10].status = false;
      this.cOption[11].status = false;
    }
    else if (value.id === 13) {
      this.cOption[6].status = false;
      this.cOption[7].status = false;
      this.cOption[8].status = false;
      this.cOption[9].status = false;
      this.cOption[10].status = true;
      this.cOption[11].status = false;
    }
    else if (value.id === 14) {
      this.cOption[6].status = false;
      this.cOption[7].status = false;
      this.cOption[8].status = false;
      this.cOption[9].status = false;
      this.cOption[10].status = false;
      this.cOption[11].status = true;

    }
  }
  plaquetasValueOp(value) {
    console.log('plaquetas', value);
    if (value.id === 15) {
      this.cOption[12].status = true;
      this.cOption[13].status = false;
      this.cOption[14].status = false;
      this.cOption[15].status = false;
    }
    else if (value.id === 16) {
      this.cOption[12].status = false;
      this.cOption[13].status = true;
      this.cOption[14].status = false;
      this.cOption[15].status = false;
    }
    else if (value.id === 17) {
      this.cOption[12].status = false;
      this.cOption[13].status = false;
      this.cOption[14].status = true;
      this.cOption[15].status = false;
    }
    else if (value.id === 18) {
      this.cOption[12].status = false;
      this.cOption[13].status = false;
      this.cOption[14].status = false;
      this.cOption[15].status = true;
    }
  }
  neutrofilosValueOp(value) {
    console.log('neutrofilos', value);
    if (value.id === 19) {
      this.cOption[16].status = true;
      this.cOption[17].status = false;
      this.cOption[18].status = false;
      this.cOption[19].status = false;
    }
    else if (value.id === 20) {
      this.cOption[16].status = false;
      this.cOption[17].status = true;
      this.cOption[18].status = false;
      this.cOption[19].status = false;
    }
    else if (value.id === 21) {
      this.cOption[16].status = false;
      this.cOption[17].status = false;
      this.cOption[18].status = true;
      this.cOption[19].status = false;
    }
    else if (value.id === 22) {
      this.cOption[16].status = false;
      this.cOption[17].status = false;
      this.cOption[18].status = false;
      this.cOption[19].status = true;
    }
  }
  linfocitosValueOp(value) {
    console.log('linfocitos', value);
    if (value.id === 23) {
      this.cOption[20].status = true;
      this.cOption[21].status = false;
      this.cOption[22].status = false;
      this.cOption[23].status = false;
    }
    else if (value.id === 24) {
      this.cOption[20].status = false;
      this.cOption[21].status = true;
      this.cOption[22].status = false;
      this.cOption[23].status = false;
    }
    else if (value.id === 25) {
      this.cOption[20].status = false;
      this.cOption[21].status = false;
      this.cOption[22].status = true;
      this.cOption[23].status = false;
    }
    else if (value.id === 26) {
      this.cOption[20].status = false;
      this.cOption[21].status = false;
      this.cOption[22].status = false;
      this.cOption[23].status = true;
    }
  }
  volumenValueOp(value) {
    console.log('volumen', value);
    if (value.id === 31) {
      this.cOption[28].status = true;
      this.cOption[29].status = false;
      this.cOption[30].status = false;
      this.cOption[31].status = false;
    }
    else if (value.id === 32) {
      this.cOption[28].status = false;
      this.cOption[29].status = true;
      this.cOption[30].status = false;
      this.cOption[31].status = false;
    }
    else if (value.id === 33) {
      this.cOption[28].status = false;
      this.cOption[29].status = false;
      this.cOption[30].status = true;
      this.cOption[31].status = false;
    }
    else if (value.id === 34) {
      this.cOption[28].status = false;
      this.cOption[29].status = false;
      this.cOption[30].status = false;
      this.cOption[31].status = true;
    }
  }
  deshidrogenasaValueOp(value) {
    console.log('volumen', value);
    if (value.id === 74) {
      this.cOption[68].status = true;
      this.cOption[69].status = false;
    }
    else if (value.id === 75) {
      this.cOption[68].status = false;
      this.cOption[69].status = true;
    }
  }
  async messageHema(title, body) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: e.header,
      message: body,
      buttons: ['Ok'],
      mode: 'ios',
    });
    await alert.present();
  }

}
class DataModel {
  id: number;
  name: string;
  result: boolean;
  textResult: string;
  symptomId: string;
  laboratoryTestId: string;
  laboratoryTestOther: string;
  initialDataId: string;
  createdDate: Date;
  results: ResultModel[] = [];
}

class ResultModel {
  id: number;
  quizId: number;
  userId: number;
  optionId: number;
  createdDate: Date;
  status: boolean;
}
