/* eslint-disable eol-last */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hematopatias',
  templateUrl: './hematopatias.page.html',
  styleUrls: ['./hematopatias.page.scss'],
})
export class HematopatiasPage implements OnInit {
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
  public data;
  constructor(private loadingCtrl: LoadingController, public router: Router,
) { }
  ionViewWillEnter() {
    this.data = {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      gg: false,
      h: false,
      hh: false,
      i: false,
      j: false,
      k: false,
      l: false,
      ll: false,
      kk: false,
      m: false,
      n: false,
      o: false,
      pp: false,
      p: false,
      q: false,
      qq: false,
      qqq: false,
      r: false,
      s: false,
      t: false,
      u: false,
      v: false,
      w: false,
      vx: false,
      x: false,
      y: false,
      z: false,
      aa: false,
      ab: false,
      ac: false,
      ad: false,
      ae: false,
      aaf: false,
      af: false,
      ag: false,
      ah: false,
      ai: false,
      aj: false,
      ak: false,
      al: false,
      am: false,
      an: false,
      ao: false,
      ap: false,
      aq: false,
      ar: false,
      as: false,
      at: false,
      au: false,
      av: false,
      aw: false,
      ax: false,
      ay: false,
      pg: false,
      az: false,
      ba: false,
      bb: false,
      bc: false,
      bd: false,
      be: false,
      bf: false,
      bg: false,
      bgg: false,
      bh: false,
      bi: false,
      bj: false,
      bk: false,
      bl: false,
      bm: false,
      tr: false,
      bn: false,
      bo: false,
      bp: false,
      bq: false,
      br: false,
      bs: false,
      bt: false,
      bu: false,
      bw: false,
      bx: false,
      by: false,
      bz: false,
      ca: false,
      cb: false,
      cx: false,
      cc: false,
      dd: false,
      dm: false,
      fm: false,
      in: false,
      il: false,
      tp: false,
      ttp: false,
      tt: false,
      ts: false,
      fa: false,
      fb: false,
      fc: false,
      fd: false,
      fe: false,
      ff: false,
      fg: false,
      fh: false,
      fi: false,
      fj: false,
      fk: false,
      eed: false,
      taq: false,
      dme: false,
      msm: false,
      hua: false,
      pea: false,
      pf: false,
    };
  }
  ngOnInit() {
    this.data = {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      gg: false,
      h: false,
      hh: false,
      i: false,
      j: false,
      k: false,
      l: false,
      ll: false,
      kk: false,
      m: false,
      n: false,
      o: false,
      pp: false,
      p: false,
      q: false,
      qq: false,
      qqq: false,
      r: false,
      s: false,
      t: false,
      u: false,
      v: false,
      w: false,
      vx: false,
      x: false,
      y: false,
      z: false,
      aa: false,
      ab: false,
      ac: false,
      ad: false,
      ae: false,
      aaf: false,
      af: false,
      ag: false,
      ah: false,
      ai: false,
      aj: false,
      ak: false,
      al: false,
      am: false,
      an: false,
      ao: false,
      ap: false,
      aq: false,
      ar: false,
      as: false,
      at: false,
      au: false,
      av: false,
      aw: false,
      ax: false,
      ay: false,
      pg: false,
      az: false,
      ba: false,
      bb: false,
      bc: false,
      bd: false,
      be: false,
      bf: false,
      bg: false,
      bgg: false,
      bh: false,
      bi: false,
      bj: false,
      bk: false,
      bl: false,
      bm: false,
      tr: false,
      bn: false,
      bo: false,
      bp: false,
      bq: false,
      br: false,
      bs: false,
      bt: false,
      bu: false,
      bw: false,
      bx: false,
      by: false,
      bz: false,
      ca: false,
      cb: false,
      cx: false,
      cc: false,
      dd: false,
      dm: false,
      fm: false,
      in: false,
      il: false,
      tp: false,
      ttp: false,
      tt: false,
      ts: false,
      fa: false,
      fb: false,
      fc: false,
      fd: false,
      fe: false,
      ff: false,
      fg: false,
      fh: false,
      fi: false,
      fj: false,
      fk: false,
      eed: false,
      taq: false,
      dme: false,
      msm: false,
      hua: false,
      pea: false,
      pf: false,
    };
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
    this.router.navigateByUrl('home');

  }
  swipeNext() {
    this.slides.slideNext();
    console.log('data', this.data);
  }
  public prev() {
    this.slides.slidePrev();
  }
  sexValue(value) {
    console.log('sex', value);
    if (value.value === 'a') {
      this.data.a = true;
      this.data.b = false;
      this.data.c = false;
    }
    else if (value.value === 'b') {
      this.data.a = false;
      this.data.b = true;
      this.data.c = false;
    }
    else if (value.value === 'c') {
      this.data.a = false;
      this.data.b = false;
      this.data.c = true;
    }
  }
  habitaValue(value) {
    console.log('habita', value);
    if (value.value === 'd') {
      this.data.d = true;
      this.data.e = false;
      this.data.f = false;
    }
    else if (value.value === 'e') {
      this.data.d = false;
      this.data.e = true;
      this.data.f = false;
    }
    else if (value.value === 'f') {
      this.data.d = false;
      this.data.e = false;
      this.data.f = true;
    }
  }
  hemoglobinaValue(value) {
    console.log('hemoglobina', value);
    if (value.value === 'g') {
      this.data.g = true;
      this.data.gg = false;
      this.data.h = false;
      this.data.hh = false;
      this.data.i = false;
      this.data.j = false;
    }
    else if (value.value === 'gg') {
      this.data.g = false;
      this.data.gg = true;
      this.data.h = false;
      this.data.hh = false;
      this.data.i = false;
      this.data.j = false;
    }
    else if (value.value === 'h') {
      this.data.g = false;
      this.data.gg = false;
      this.data.h = true;
      this.data.hh = false;
      this.data.i = false;
      this.data.j = false;
    }
    else if (value.value === 'hh') {
      this.data.g = false;
      this.data.gg = false;
      this.data.h = false;
      this.data.hh = true;
      this.data.i = false;
      this.data.j = false;
    }
    else if (value.value === 'i') {
      this.data.g = false;
      this.data.gg = false;
      this.data.h = false;
      this.data.hh = false;
      this.data.i = true;
      this.data.j = false;
    }
    else if (value.value === 'j') {
      this.data.g = false;
      this.data.gg = false;
      this.data.h = false;
      this.data.hh = false;
      this.data.i = false;
      this.data.j = true;

    }
  }
  plaquetasValue(value) {
    console.log('plaquetas', value);
    if (value.value === 'k') {
      this.data.k = true;
      this.data.l = false;
      this.data.ll = false;
      this.data.kk = false;
    }
    else if (value.value === 'l') {
      this.data.k = false;
      this.data.l = true;
      this.data.ll = false;
      this.data.kk = false;
    }
    else if (value.value === 'll') {
      this.data.k = false;
      this.data.l = false;
      this.data.ll = true;
      this.data.kk = false;
    }
    else if (value.value === 'kk') {
      this.data.k = false;
      this.data.l = false;
      this.data.ll = false;
      this.data.kk = true;
    }
  }
  neutrofilosValue(value) {
    console.log('neutrofilos', value);
    if (value.value === 'm') {
      this.data.m = true;
      this.data.n = false;
      this.data.o = false;
      this.data.pp = false;
    }
    else if (value.value === 'n') {
      this.data.m = false;
      this.data.n = true;
      this.data.o = false;
      this.data.pp = false;
    }
    else if (value.value === 'o') {
      this.data.m = false;
      this.data.n = false;
      this.data.o = true;
      this.data.pp = false;
    }
    else if (value.value === 'pp') {
      this.data.m = false;
      this.data.n = false;
      this.data.o = false;
      this.data.pp = true;
    }
  }
  linfocitosValue(value) {
    console.log('linfocitos', value);
    if (value.value === 'p') {
      this.data.p = true;
      this.data.q = false;
      this.data.qq = false;
      this.data.qqq = false;
    }
    else if (value.value === 'q') {
      this.data.p = false;
      this.data.q = true;
      this.data.qq = false;
      this.data.qqq = false;
    }
    else if (value.value === 'qq') {
      this.data.p = false;
      this.data.q = false;
      this.data.qq = true;
      this.data.qqq = false;
    }
    else if (value.value === 'qqq') {
      this.data.p = false;
      this.data.q = false;
      this.data.qq = false;
      this.data.qqq = true;
    }
  }
  volumenValue(value) {
    console.log('volumen', value);
    if (value.value === 'v') {
      this.data.v = true;
      this.data.w = false;
      this.data.vx = false;
      this.data.x = false;
    }
    else if (value.value === 'w') {
      this.data.v = false;
      this.data.w = true;
      this.data.vx = false;
      this.data.x = false;
    }
    else if (value.value === 'vx') {
      this.data.v = false;
      this.data.w = false;
      this.data.vx = true;
      this.data.x = false;
    }
    else if (value.value === 'x') {
      this.data.v = false;
      this.data.w = false;
      this.data.vx = false;
      this.data.x = true;
    }
  }
  deshidrogenasaValue(value) {
    console.log('volumen', value);
    if (value.value === 'bg') {
      this.data.bg = true;
      this.data.bgg = false;
    }
    else if (value.value === 'bgg') {
      this.data.bg = false;
      this.data.bgg = true;
    }
  }
}

class DataDiagnosticModel {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  gg: boolean;
  h: boolean;
  hh: boolean;
  i: boolean;
  j: boolean;
  k: boolean;
  l: boolean;
  ll: boolean;
  kk: boolean;
  m: boolean;
  n: boolean;
  o: boolean;
  pp: boolean;
  p: boolean;
  q: boolean;
  qq: boolean;
  qqq: boolean;
  r: boolean;
  s: boolean;
  t: boolean;
  u: boolean;
  v: boolean;
  w: boolean;
  vx: boolean;
  x: boolean;
  y: boolean;
  z: boolean;
  aa: boolean;
  ab: boolean;
  ac: boolean;
  ad: boolean;
  ae: boolean;
  aaf: boolean;
  af: boolean;
  ag: boolean;
  ah: boolean;
  ai: boolean;
  aj: boolean;
  ak: boolean;
  al: boolean;
  am: boolean;
  an: boolean;
  ao: boolean;
  ap: boolean;
  aq: boolean;
  ar: boolean;
  as: boolean;
  at: boolean;
  au: boolean;
  av: boolean;
  aw: boolean;
  ax: boolean;
  ay: boolean;
  pg: boolean;
  az: boolean;
  ba: boolean;
  bb: boolean;
  bc: boolean;
  bd: boolean;
  be: boolean;
  bf: boolean;
  bg: boolean;
  bgg: boolean;
  bh: boolean;
  bi: boolean;
  bj: boolean;
  bk: boolean;
  bl: boolean;
  bm: boolean;
  tr: boolean;
  bn: boolean;
  bo: boolean;
  bp: boolean;
  bq: boolean;
  br: boolean;
  bs: boolean;
  bt: boolean;
  bu: boolean;
  bw: boolean;
  bx: boolean;
  by: boolean;
  bz: boolean;
  ca: boolean;
  cb: boolean;
  cx: boolean;
  cc: boolean;
  dd: boolean;
  dm: boolean;
  fm: boolean;
  in: boolean;
  il: boolean;
  tp: boolean;
  ttp: boolean;
  tt: boolean;
  ts: boolean;
  fa: boolean;
  fb: boolean;
  fc: boolean;
  fd: boolean;
  fe: boolean;
  ff: boolean;
  fg: boolean;
  fh: boolean;
  fi: boolean;
  fj: boolean;
  fk: boolean;
  eed: boolean;
  taq: boolean;
  dme: boolean;

  msm: boolean;
  hua: boolean;
  pea: boolean;
  pf: boolean;
}
