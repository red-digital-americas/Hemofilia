import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public disabled = false;
  showPassport = false;
  activePassword = false;
  activePassword2 = false;
  password2: any;
  regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  hintMessen: any;
  hintMessen2: any;
  hintId = document.getElementById('hintpass');
  hintId2 = document.getElementById('hintpass2');
  passCorrect = false;
  public password;
  eyed = false;
  public typeInput = 'password';
  eyed2 = false;
  public typeInput2 = 'password';

  validar = false;
  btnDisables = false;
  public data;
  public idUser;
  public title = '';
  public body = '';


  constructor(public router: Router,
    public service: ServiceGeneralService, private alertController: AlertController, public routerActive: ActivatedRoute,) { }
  ionViewWillEnter() {
    console.log(this.routerActive.snapshot.paramMap.get('id'));
    this.idUser = this.routerActive.snapshot.paramMap.get('id');
    this.getData(this.idUser);
  }

  ngOnInit() {
    console.log('user', this.idUser);
    this.getData(this.idUser);
    this.password = '';
    this.password2 = '';
    this.btnDisables = true;


  }
  getData(id: number) {
    this.service.serviceGeneralGet(`User/${id}`).subscribe(resp => {
      if (resp.success) {
        this.data = resp.result;
        console.log('data', this.data);
      } else {
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

  validarPass() {
    if (this.password === undefined && this.password !== '') {
      this.hintMessen = 'Campo requerido';
      this.hintMessen2 = 'Campo requerido';
      this.activePassword = true;
      this.btnDisables = true;
    } if (this.password2 === undefined && this.password2 !== '') {
      this.hintMessen = 'Campo requerido';
      this.hintMessen2 = 'Campo requerido';
      this.activePassword2 = true;
      this.btnDisables = true;

    }
    if (this.password !== '' && this.password2 !== '') {
      //si las contraseñas no coinciden
      if (this.password !== this.password2) {
        this.activePassword = true;
        this.activePassword2 = true;
        this.hintMessen = 'No es la misma contraseña';
        this.hintMessen2 = 'No es la misma contraseña';
        this.btnDisables = true;

      }
      else if (this.password === this.password2) {
        //Si todo esta correcto
        if (this.regex.test(this.password)) {
          this.activePassword = false;
          this.activePassword2 = false;
          console.log('correcto las contraseñas coinciden');
          this.passCorrect = true;
          this.btnDisables = false;


        }
        // si no es correcto
        else {
          this.btnDisables = true;
          this.activePassword = true;
          this.activePassword2 = true;
          this.hintMessen = 'Contraseña invalida';
          this.hintMessen2 = 'Contraseña invalida';
          // letras mayusculas
          const patronMayus = /[A-Z]/g;
          const letterUpercaseSearch = (this.password.match(patronMayus));
          if (letterUpercaseSearch == null) {
            console.log('no hay letras mayus');
            this.hintMessen = 'Agrega una letra mayuscula';
            this.hintMessen2 = 'Agrega una letra mayuscula';
          }
          else {
            console.log('si hay mayusculas');
            console.log(this.password.match(patronMayus));
          }
          // buscar numeros
          const patronnumber = /[1-9]/g;
          const numberSearch = (this.password.match(patronnumber));
          if (numberSearch == null) {
            console.log('no hay numeros');
            this.hintMessen = 'Agrega un numero';
            this.hintMessen2 = 'Agrega un numero';
          }
          else {
            console.log('si hay numeros');
            console.log(this.password.match(patronnumber));
          }
          // mayor a 8 caracteres
          if (this.password.length < 8) {
            this.hintMessen = 'Minimo 8 caracteres';
            this.hintMessen2 = 'Minimo 8 caracteres';
          }
        }
      }
    }
    else {
      this.activePassword = true;
      this.activePassword2 = true;
      this.hintMessen = 'Contraseña vacia';
      this.hintMessen2 = 'Contraseña vacia';
      this.btnDisables = true;

    }
  }
  validarForm() {
    if (this.passCorrect === true) {
      this.save();
    }
    else {
      this.activePassword = true;
      this.activePassword2 = true;
      this.hintMessen = 'Contraseña invalida';
      this.hintMessen2 = 'Contraseña invalida';
    }
  }
  public viewPassword(type) {
    if (type === true) {
      this.typeInput = 'text';
      this.eyed = true;
    } else {
      this.typeInput = 'password';
      this.eyed = false;
    }
  }
  back() {
    console.log('regresar');
    this.router.navigateByUrl('/perfil-user/home');

  }
  public viewPassword2(type) {
    if (type === true) {
      this.typeInput2 = 'text';
      this.eyed2 = true;
    } else {
      this.typeInput2 = 'password';
      this.eyed2 = false;
    }
  }
  save() {
    this.btnDisables = true;
    this.service.serviceGeneralPut(`User/Change_password?email=${this.data.user.email}&password=${this.password}`, '').subscribe(r => {
      if (r.success) {
        console.log('respuesta de update', r);
        this.title = 'Exito';
        this.body = 'Se cambio la contraseña correctame';
        this.message(this.title, this.body);
      }
      else {
        this.title = 'Error';
        this.message(this.title, r.message);
      }
    }, (error) => {
      console.log(error);
      this.title = 'Error';
      this.body = error;
      // this.title = 'Error';
      this.message(this.title, this.body);
    });
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
}
