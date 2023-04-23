import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  // public data: UserModel = new UserModel();
  public data: any;
  public disabledd = true;
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
  public catState;
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
    other: [''],
    professionalLicense: [''],
    professionalLicenseProcedure: [''],
  });

  fourStep = this.formBuilder.group({
    consultingType: ['', [Validators.required]],
    phoneConsulting: ['', [Validators.required]],
    state: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  fiveStep = this.formBuilder.group({
    schedule: [''],
    // scheduleDay: ['', [Validators.required]],
  });
  sixStep = this.formBuilder.group({
    email: ['', Validators.email],
  });
  public user: any;
  public dayCalendar: any[] = [];

  constructor(private formBuilder: FormBuilder,
    public router: Router,
    public service: ServiceGeneralService, private alertController: AlertController, public datepipe: DatePipe) {
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    this.getData(this.user.id);
    this.getEspecialidades();
    this.getConsultorio();
    this.getDay();
    this.getSchedule();
    this.getState();

  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user', this.user);
    this.getData(this.user.id);
  }
  getData(id: number) {
    this.service.serviceGeneralGet(`User/${id}`).subscribe(resp => {
      if (resp.success) {
        this.data = resp.result;
        console.log('data', this.data);
        this.oneStep = this.formBuilder.group({
          roleId: [this.data.user.roleId, [Validators.required]],
        });
        this.twoStep = this.formBuilder.group({
          name: [this.data.user.name, [Validators.required]],
          firstName: [this.data.user.firstName, [Validators.required]],
          birthday: [this.data.user.dateBirth, [Validators.required]],
          sex: [this.data.user.sex, [Validators.required]],
        });
        this.threeStep = this.formBuilder.group({
          specialityId: [this.data.user.specialityId, [Validators.required]],
          other: [this.data.user.other],
          professionalLicense: [this.data.user.professionalLicense],
          professionalLicenseProcedure: [this.data.user.professionalLicenseProcedure],
        });

        this.sixStep = this.formBuilder.group({
          email: [this.data.user.email, Validators.required],
        });
        this.fourStep = this.formBuilder.group({
          consultingType: [this.data.user.consultingType, [Validators.required]],
          phoneConsulting: [this.data.user.phone, [Validators.required]],
          state: [this.data.user.stateId, [Validators.required]],
          address: [this.data.user.address, [Validators.required]],
        });
        this.dayCalendar = this.data.calendario;
        this.fiveStep = this.formBuilder.group({
          schedule: [''],
        });
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
  back() {
    console.log('regresar');
    this.router.navigateByUrl('/perfil-doctor/home');
  }
  addDay() {
    this.dayCalendar.push({
      id: 0,
      userId: this.user.id,
      dayId: 0,
      scheduleId: 0
    });
    console.log('recuersos', this.dayCalendar);
  }
  deleteDay(data, index) {
    console.log('index', index);
    console.log('data', data);
    if (data.id !== 0) {
      this.service.serviceGeneralDelete(`User/DeleteCalendario?id=${data.id}`).subscribe(resp => {
        if (resp.success) {
          console.log('resp delete calendar', resp.result);
          this.getData(this.user.id);
          this.dayCalendar = [];
        }
      });
    }
    else {
      if (this.dayCalendar.length !== 1) {
        this.dayCalendar.splice(index, 1);
      }
    }


  }

  getState() {
    this.service.serviceGeneralGet('CatState').subscribe(resp => {
      if (resp.success) {
        this.catState = resp.result;
        console.log('cat estado', this.catState);
      }
    });
  }
  getEspecialidades() {
    this.service.serviceGeneralGet('CatSpeciality').subscribe(resp => {
      if (resp.success) {
        this.especialidades = resp.result;
        console.log('cat especialidades', this.especialidades);
      }
    });
  }

  home() {
    this.ionViewWillEnter();
    this.router.navigateByUrl('/perfil-doctor/home');
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
      // eslint-disable-next-line max-len
      this.body = 'Nos encantaría que te unieras al equipo de hematólogos que queremos ver cada vez menos pacientes con enfermedades en etapas avanzadas, para ello, médicos de primer contacto podrán  contactarte brevemente para resolver dudas puntuales, de manera anónima y solo en los momentos libres que tengas, a tu elección. ';
      this.message(this.title, this.body);
    }
  }
  step1() {
    console.log('paso 1');

    this.oneScreen = true;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  step2() {
    console.log('paso 2');

    this.oneScreen = false;
    this.twoScreen = true;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  // desicion
  step3() {
    console.log('paso 3');

    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = true;
    this.fourScreen = false;
    this.fiveScreen = false;
    this.sixScreen = false;
  }
  step4() {
    console.log('paso 4');

    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = true;
    this.fiveScreen = false;
    this.sixScreen = false;
  }

  step5() {
    console.log('paso 5');
    console.log(this.dayCalendar);
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.fiveScreen = true;
    this.sixScreen = false;
  }

  step6() {
    console.log('paso 6, guardar calendario');
    // this.saveCalendar();
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
  saveCalendar(){

    this.service.serviceGeneralPostWithUrl(`User/Calendar/${this.user.id}`, this.dayCalendar).subscribe(resp => {
      if (resp.success) {
        this.title = 'Exito';
        this.body = 'Se guardo la disponibilidad de atención correctame';
        this.message(this.title, this.body);
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

  save() {
    this.disabledd = true;
    this.formartDate();
    console.log('Save General');
    this.data.user.token = '';
    this.data.user.roleId = this.oneStep.value.roleId;
    this.data.user.name = this.twoStep.value.name;
    this.data.user.firstName = this.twoStep.value.firstName;
    this.data.user.dateBirth = this.twoStep.value.birthday;
    this.data.user.sex = this.twoStep.value.sex;
    this.data.user.specialityId = this.threeStep.value.specialityId;
    this.data.user.professionalLicense = this.threeStep.value.professionalLicense;
    this.data.user.other = this.threeStep.value.other;
    this.data.user.professionalLicenseProcedure = this.threeStep.value.professionalLicenseProcedure;
    this.data.user.email = this.sixStep.value.email;
    this.data.user.status = true;
    this.data.user.phone = this.fourStep.value.phoneConsulting;
    this.data.user.consultingType = this.fourStep.value.consultingType;
    this.data.user.stateId = this.fourStep.value.state;

    this.data.user.address = this.fourStep.value.address;
    this.data.user.updatedBy = this.user.id;
    this.data.user.updatedDate = this.today;
    console.log('data', this.data.user);

    this.service.serviceGeneralPut('User/Edit_user', this.data.user).subscribe(resp => {
      if (resp.success) {
        this.title = 'Exito';
        this.body = 'Se actualizo correctame su perfil';
        this.message(this.title, this.body);
        this.router.navigateByUrl('/perfil-doctor/home');
        this.disabledd = false;
        this.ngOnInit();
        this.step1();
      } else {
        this.title = 'Error';
        this.router.navigateByUrl('/perfil-doctor/home');
        this.message(this.title, resp.message);
        this.disabledd = false;
      }
    },
      (error) => {
        console.log(error);
        this.title = 'Error';
        this.message(this.title, error.error.message);
        this.disabledd = false;
      });
  }
  changePassword(){
    this.router.navigateByUrl(`/perfil-doctor/change-password/${this.data.user.id}`);
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



