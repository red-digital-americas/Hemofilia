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
  public threeScreenG = false;
  public threeScreenE = false;
  public fourScreenG = false;
  public fourScreenE = false;
  public fiveScreenG = false;
  public fiveScreenE = false;
  public sixScreenE = false;
  public today = new Date();
  public title = '';
  public body = '';
  public createDate = '';


  oneStep = this.formBuilder.group({
    roleId: ['', [Validators.required]],
  });
  twoStep = this.formBuilder.group({
    name: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });
  threStepGeneral = this.formBuilder.group({
    specialityId: ['', [Validators.required]],
    professionalLicense: [''],
    professionalLicenseProcedure: [''],
  });
  threStepEspecialist = this.formBuilder.group({
    consultingType: ['', [Validators.required]],
    institutio: ['', [Validators.required]],
    phoneConsulting: ['', [Validators.required]],
    address: ['', [Validators.required]],

  });
  fourStepGeneral = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', [Validators.required]],
  });
  fourStepEspecialist = this.formBuilder.group({
    schedule: ['', Validators.required],
    scheduleDay: ['', [Validators.required]],
  });
  fiveStepGeneral = this.formBuilder.group({
    code: ['', Validators.required],
  });
  fiveStepEspecialist = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', [Validators.required]],
  });
  sixStepEspecialist = this.formBuilder.group({
    code: ['', Validators.required],
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
  }
  ngOnInit() {
    this.oneStep = this.formBuilder.group({
      roleId: ['', [Validators.required]],
      // email: ['', Validators.email],
    });
  }
  iniciarSesion() {
    this.ionViewWillEnter();
    this.router.navigateByUrl('login');
  }
  step1() {
    this.oneScreen = true;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = false;
    this.fiveScreenG = false;
    this.fiveScreenE = false;
    this.sixScreenE = false;
  }
  step2() {
    this.oneScreen = false;
    this.twoScreen = true;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = false;
    this.fiveScreenG = false;
    this.fiveScreenE = false;
    this.sixScreenE = false;
  }
  // desicion
  step3() {
    if (this.oneStep.value.roleId === 1) {
      this.medicalType = 'general';
      this.oneScreen = false;
      this.twoScreen = false;
      this.threeScreenG = true;
      this.threeScreenE = false;
      this.fourScreenG = false;
      this.fourScreenE = false;
      this.fiveScreenG = false;
      this.fiveScreenE = false;
      this.sixScreenE = false;
    }
    else if (this.oneStep.value.roleId === 4) {
      this.medicalType = 'especialista';
      this.oneScreen = false;
      this.twoScreen = false;
      this.threeScreenG = false;
      this.threeScreenE = true;
      this.fourScreenG = false;
      this.fourScreenE = false;
      this.fiveScreenG = false;
      this.fiveScreenE = false;
      this.sixScreenE = false;
    }
  }
  step4G() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = true;
    this.fourScreenE = false;
    this.fiveScreenG = false;
    this.fiveScreenE = false;
    this.sixScreenE = false;
  }
  step4E() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = true;
    this.fiveScreenG = false;
    this.fiveScreenE = false;
    this.sixScreenE = false;
  }
  step5G() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = false;
    this.fiveScreenG = true;
    this.fiveScreenE = false;
    this.sixScreenE = false;
  }
  step5E() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = false;
    this.fiveScreenG = false;
    this.fiveScreenE = true;
    this.sixScreenE = false;
  }
  step6E() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreenG = false;
    this.threeScreenE = false;
    this.fourScreenG = false;
    this.fourScreenE = false;
    this.fiveScreenG = false;
    this.fiveScreenE = false;
    this.sixScreenE = true;
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
  saveG() {
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
    this.data.specialityId = this.threStepGeneral.value.specialityId;
    this.data.professionalLicense = this.threStepGeneral.value.professionalLicense;
    this.data.professionalLicenseProcedure = this.threStepGeneral.value.professionalLicenseProcedure;
    this.data.email = this.fourStepGeneral.value.email;
    this.data.password = this.fourStepGeneral.value.password;
    this.data.status = true;
    this.data.phone = '';
    // this.data.consultingType = null;
    this.data.address = '';
    // this.data.institution = null;
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
        this.router.navigateByUrl('login');
        this.disabled = false;
      } else {
        this.title = 'Error';
        this.router.navigateByUrl('login');
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
  saveE() {
    console.log('Save Especialista');

    this.data.id = 0;
    this.data.email = this.fiveStepEspecialist.value.email;
    this.data.password = this.fiveStepEspecialist.value.password;
    this.data.token = '';
    this.data.name = this.twoStep.value.name;
    this.data.professionalLicense = this.threStepGeneral.value.professionalLicense;
    this.data.specialityId = this.threStepGeneral.value.specialityId;
    this.data.professionalLicenseProcedure = this.threStepGeneral.value.professionalLicenseProcedure;
    this.data.roleId = this.oneStep.value.roleId;
    this.data.status = true;
    this.data.phone = this.threStepEspecialist.value.phoneConsulting;
    this.data.dateBirth = this.twoStep.value.birthday;
    this.data.firstName = this.twoStep.value.firstName;
    this.data.consultingType = this.threStepEspecialist.value.consultingType;
    this.data.sex = this.twoStep.value.sex;
    this.data.address = this.threStepEspecialist.value.address;
    this.data.institution = this.threStepEspecialist.value.institutio;
    this.data.createdBy = 0;
    this.data.createdDate = this.today;
    this.data.updatedBy = 0;
    this.data.updatedDate = this.today;
    this.title = 'Exito';
    this.body = 'Se creao correctame la cuenta';
    this.message(this.title, this.body);
    this.router.navigateByUrl('login');

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
