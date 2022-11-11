import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public home: string;
  public user: any;

  constructor(private activatedRoute: ActivatedRoute, public router: Router,
  ) { }
  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
  }
  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');

  }
  iniciarDiagnostico() {
    this.router.navigateByUrl('/perfil-doctor/diagnostico');
  }
  // registro() {
  //   this.router.navigateByUrl('create-user');

  // }
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
  // call(numero) {
  //   this.callNumber
  //     .callNumber(numero, true)
  //     .then((res) => console.log('Launched dialer!', res))
  //     .catch((err) => console.log('Error launching dialer', err));

  // }
}
