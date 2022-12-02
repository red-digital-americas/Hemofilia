/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public data: UserModel = new UserModel();
  public disabled = true;
  public medicalType = '';
  public oneScreen = true;
  public twoScreen = false;
  public threeScreen = false;
  public fourScreen = false;
  public fiveScreen = false;
  public sixScreen = false;
  public today = new Date();
  public title = '';
  public body = '';
  public createDate = '';
  public especialidades;
  public consultorio;
  public catDay;
  public catSchedule;
  public optionDay;





  oneStep = this.formBuilder.group({
    roleId: ['', [Validators.required]],
  });
  twoStep = this.formBuilder.group({
    name: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });
  threeStep = this.formBuilder.group({
    specialityId: ['', [Validators.required]],
    professionalLicense: [''],
    professionalLicenseProcedure: [false],
  });

  fourStep = this.formBuilder.group({
    consultingType: ['', [Validators.required]],
    phoneConsulting: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  // fiveStep = this.formBuilder.group({
  //   schedule: ['', Validators.required],
  // });
  sixStep = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', [Validators.required]],
    term: ['false', [Validators.requiredTrue]],

  });
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    public service: ServiceGeneralService, private alertController: AlertController, public datepipe: DatePipe) {
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ionViewWillEnter() {
    this.oneStep = this.formBuilder.group({
      roleId: ['', [Validators.required]],
      // email: ['', Validators.email],
    });
    this.getEspecialidades();
    this.getConsultorio();
    this.getDay();
    this.getSchedule();

  }
  ngOnInit() {

    this.oneStep = this.formBuilder.group({
      roleId: ['', [Validators.required]],
      // email: ['', Validators.email],
    });

  }
  iniciarSesion() {
    this.ionViewWillEnter();
    this.router.navigateByUrl('/perfil-user/login');
  }
  getEspecialidades() {
    this.service.serviceGeneralGet('CatSpeciality').subscribe(resp => {
      if (resp.success) {
        this.especialidades = resp.result;
        console.log('cat especialidades', this.especialidades);
      }
    });
  }
  getConsultorio() {
    this.service.serviceGeneralGet('CatConsultorio').subscribe(resp => {
      if (resp.success) {
        this.consultorio = resp.result;
        console.log('cat consultorio', this.consultorio);
      }
    });
  }
  getDay() {
    this.service.serviceGeneralGet('CatDay').subscribe(resp => {
      if (resp.success) {
        this.catDay = resp.result;
        console.log('catDay', this.catDay);
      }
    });
  }
  getSchedule() {
    this.service.serviceGeneralGet('CatSchedule').subscribe(resp => {
      if (resp.success) {
        this.catSchedule = resp.result;
        console.log('cat catSchedule', this.catSchedule);
      }
    });
  }
  invitacionHematologicos() {
    console.log('especialidad', this.threeStep.value.specialityId);
    if (this.threeStep.value.specialityId === 1) {
      this.title = 'Hola';
      this.body = 'Nos encantaría que te unieras al equipo de hematólogos que queremos ver cada vez menos pacientes con enfermedades en etapas avanzadas, para ello, médicos de primer contacto podrán  contactarte brevemente para resolver dudas puntuales, de manera anónima y solo en los momentos libres que tengas, a tu elección. ';
      this.message(this.title, this.body);
    }
  }
  step1() {
    this.oneScreen = true;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  step2() {
    this.oneScreen = false;
    this.twoScreen = true;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  // desicion
  step3() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = true;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  step4() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = true;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  step6() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = true;
  }
  formartDate() {
    // 2022-03-11T17:27:00
    console.log('date', this.today);
    let time = '';
    const hour = this.today.getHours();
    const minute = this.today.getMinutes();
    let hourString = hour.toString();
    let minuteString = minute.toString();
    const date = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    if (hourString.length < 2) {
      hourString = `0${hourString}`;
    }
    if (minuteString.length < 2) {
      minuteString = `0${minuteString}`;
    }
    console.log('hour', hourString);
    console.log('minute', minuteString);
    time = `${hourString}:${minuteString}:00`;
    console.log('date', date);
    this.createDate = `${date}T${time}`;
    console.log('createDate', this.createDate);
  }

  save() {
    this.disabled = true;
    this.formartDate();
    console.log('Save General');
    this.data.id = 0;
    this.data.token = '';
    this.data.roleId = this.oneStep.value.roleId;
    this.data.name = this.twoStep.value.name;
    this.data.firstName = this.twoStep.value.firstName;
    this.data.dateBirth = this.twoStep.value.birthday;
    this.data.sex = this.twoStep.value.sex;
    this.data.specialityId = this.threeStep.value.specialityId;
    this.data.professionalLicense = this.threeStep.value.professionalLicense;
    this.data.professionalLicenseProcedure = this.threeStep.value.professionalLicenseProcedure;
    this.data.email = this.sixStep.value.email;
    this.data.password = this.sixStep.value.password;
    this.data.status = true;
    this.data.phone = this.fourStep.value.phoneConsulting;
    this.data.consultingType = this.fourStep.value.consultingType;
    this.data.address = this.fourStep.value.address;
    this.data.createdBy = 0;
    this.data.createdDate = this.today;
    this.data.updatedBy = 0;
    this.data.updatedDate = this.today;
    console.log('fecha', this.today);

    this.service.serviceGeneralPostWithUrl('User', this.data).subscribe(resp => {
      if (resp.success) {
        this.title = 'Exito';
        this.body = 'Se creo correctame la cuenta de Medico';
        this.message(this.title, this.body);
        this.router.navigateByUrl('/perfil-user/login');
        this.disabled = false;
      } else {
        this.title = 'Error';
        this.router.navigateByUrl('/perfil-user/login');
        this.message(this.title, resp.message);
        this.disabled = false;
      }
    },
      (error) => {
        console.log(error);
        this.title = 'Error';
        this.message(this.title, error.error.message);
        this.disabled = false;
      });
  }

  // falta sex institutio consultingType address schedule
  verificarCode() { }
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

class UserModel {
  id: number;
  email: string;
  password: string;
  token: string;
  name: string;
  professionalLicense: string;
  specialityId: number;
  professionalLicenseProcedure: true;
  roleId: number;
  status: true;
  phone: string;
  dateBirth: Date;
  firstName: string;
  consultingType: number;
  sex: number;
  address: string;
  institution: number;
  createdBy: number;
  createdDate: Date;
  updatedBy: number;
  updatedDate: Date;
}


