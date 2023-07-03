import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educacion-medica',
  templateUrl: './educacion-medica.component.html',
  styleUrls: ['./educacion-medica.component.scss'],
})
export class EducacionMedicaComponent implements OnInit {

  slideOpt ={
    direction: 'horizontal',
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
    }
  };

  constructor(public router: Router,) { }

  ngOnInit() { }
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
