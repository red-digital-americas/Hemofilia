import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: any;
  public home: string;
  public user: any;
  public startedPlay = false;
  public show = false;

  constructor(private activatedRoute: ActivatedRoute, public router: Router,
  ) { }

  ionViewWillEnter() {
    console.log('hola user');
    this.videoplayer.nativeElement.pause();
  }
  ngOnInit() {


  }
  login() {
    this.router.navigateByUrl('/perfil-user/login');
  }
  registro() {
    this.router.navigateByUrl('/perfil-user/create-user');

  }
  goTerminos() {
    this.router.navigateByUrl('/perfil-user/terminos');

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
  pauseVideo(videoplayer) {
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
