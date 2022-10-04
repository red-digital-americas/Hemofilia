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
    this.router.navigateByUrl('hematopatias');

  }
  home() {
    console.log('home');
    this.router.navigateByUrl('home');

  }
  getData() {
    if (this.idResult === '1') {
      this.data = [
        {
          id: 1,
          name: 'Anemia microcitica hipocrómica por deficiencia de hierro',
          type: 'Anemia',
        },
        {
          id: 2,
          name: 'Anemia microcítica hipocrómica por enfermedad crónica o de tipo inflamatorio',
          type: 'Anemia',
        },
        {
          id: 3,
          name: 'Anemia microcítica hipocrómica por talasemia',
          type: 'Anemia',
        },
        {
          id: 4,
          name: 'Anemia microcitica por intoxicación por cobre o plomo',
          type: 'Anemia',
        }
      ];
      this.data.recomendacion = 'Complete laboratorios con Ferritina, cinética de hierro.';
    }
    else {
      this.data = undefined;
    }
  }
  especialistas(){
    this.router.navigateByUrl('medical-network');

  }
  goTerminos() {
    this.router.navigateByUrl('terminos-y-condiciones');

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
