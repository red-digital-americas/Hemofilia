import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Quiénes somos', url: '/about', icon: 'body' },
    { title: 'Diagn. de hematopatías', url: 'hematopatias', icon: 'document' },
    { title: 'Estudios clínicos', url: 'clinical-studies', icon: 'reader' },
    { title: 'Red Médica', url: 'medical-network', icon: 'pulse' },
    { title: 'Perfil', url: 'profile', icon: 'person' },
  ];
  constructor() {}
  ngOnInit() {}
}
