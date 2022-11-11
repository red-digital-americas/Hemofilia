import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
})
export class TerminosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public router: Router,
  ) { }
  ngOnInit() { }
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
    this.router.navigateByUrl('/perfil-user/terminos');

  }

}
