import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: any;
  @ViewChild(HeaderComponent) header: HeaderComponent;

  public home: string;
  public user: any;
  public startedPlay = false;
  public show = false;

  constructor(private activatedRoute: ActivatedRoute, public router: Router,
  ) { }
  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    this.videoplayer.nativeElement.pause();
    this.menu();

  }
  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
    this.menu();

  }
  menu() {
    console.log('obtener menu');
    // this.header.menuChange();
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
  pauseVideo(videoplayer) {
    console.log('videoplayer', videoplayer);

    videoplayer.nativeElement.play();
    setTimeout(() => {
      videoplayer.nativeElement.pause();
      if (videoplayer.nativeElement.paused) {
        this.show = !this.show;
      }
    }, 5000);
    // }
  }
  closebutton(videoplayer) {
    this.show = !this.show;
    videoplayer.nativeElement.play();
  }


}
