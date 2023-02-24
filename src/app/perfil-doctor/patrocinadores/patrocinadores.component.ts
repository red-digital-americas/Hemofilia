import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.component.html',
  styleUrls: ['./patrocinadores.component.scss'],
})
export class PatrocinadoresComponent implements OnInit {

  constructor(public router: Router,) { }

  ngOnInit() {}
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
