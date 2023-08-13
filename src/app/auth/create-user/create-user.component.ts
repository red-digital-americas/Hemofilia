/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiceGeneralService } from 'src/app/core/servises/service-general/service-general.service';
import { DatePipe } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';

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
  public horario4mypatient = false;
  public five = false;
  public today = new Date();
  public title = '';
  public body = '';
  public createDate = '';
  public especialidades;
  public consultorio;
  public catDay;
  public catSchedule;
  public optionDay;
  public catState;
  public countAttri = 0;
  uuid: string;



  // banderas para doctor hematologo y union a 4mypatient
  public medico4mypatient = false;
  doc4mypatient = false;

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
    professionalLicenseProcedure: [false, [Validators.required]],
  });
  fourStep = this.formBuilder.group({
    consultingType: ['', [Validators.required]],
    phoneConsulting: ['', [Validators.required]],
    state: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  fiveStep = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', [Validators.required]],
    term: ['false', [Validators.requiredTrue]],

  });
  medico4mypatientStep = this.formBuilder.group({
    availableForCall: ['false'],
  });
  public dayCalendar: any[] = [];

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
    this.getState();


  }
  ngOnInit() {
    this.oneStep = this.formBuilder.group({
      roleId: ['', [Validators.required]],
      // email: ['', Validators.email],
    });
  }
  iniciarSesion() {
    this.router.navigateByUrl('/perfil-user/login');
    this.ionViewWillEnter();
  }
  getEspecialidades() {
    this.service.serviceGeneralGet('CatSpeciality').subscribe(resp => {
      if (resp.success) {
        this.especialidades = resp.result;
        console.log('cat especialidades', this.especialidades);
      }
    });
  }
  getState() {
    this.service.serviceGeneralGet('CatState').subscribe(resp => {
      if (resp.success) {
        this.catState = resp.result;
        console.log('cat estado', this.catState);
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
  // invitacionHematologicos() {
  //   console.log('especialidad', this.threeStep.value.specialityId);
  //   if (this.threeStep.value.specialityId === 1) {
  //     this.medico4mypatient = true;
  //   }
  //   else {
  //     this.medico4mypatient = false;
  //   }
  // }
  step1() {
    this.oneScreen = true;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.five = false;

  }
  step2() {
    this.oneScreen = false;
    this.twoScreen = true;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.five = false;

  }
  step3(direccion: string) {
    console.log(direccion);
    if (direccion === 'adelante') {
      this.oneScreen = false;
      this.twoScreen = false;
      this.threeScreen = true;
      this.medico4mypatient = false;
      this.horario4mypatient = false;
      this.fourScreen = false;
      this.five = false;
    }
    else if (direccion === 'atrasHemato') {
      this.threeScreen = true;
      this.medico4mypatient = false;
    }
    else {
      this.oneScreen = false;
      this.twoScreen = false;
      this.fourScreen = false;
      this.five = false;
      if (this.threeStep.value.specialityId === 1) {
        if (this.medico4mypatientStep.value.availableForCall === true) {
          this.horario4mypatient = true;
          this.medico4mypatient = false;
        }
        else {
          //esta opcion es regresar de medico4mypatient a paso 3
          this.medico4mypatient = true;
        }
      }
      else {
        //si la especialida no es hematologica
        this.threeScreen = true;
        this.medico4mypatient = false;

      }
    }
  }
  m4mypatientStep() {
    console.log('m4mypatientStep');
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.horario4mypatient = false;
    if (this.threeStep.value.specialityId === 1) {
      this.medico4mypatient = true;
    }
    else {
      this.medico4mypatient = false;
      this.fourScreen = true;
    }
  }
  stepHorario() {
    console.log('horario');
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    if (this.medico4mypatientStep.value.availableForCall === true) {
      this.horario4mypatient = true;
    }
    else {
      this.horario4mypatient = false;
      this.fourScreen = true;
    }
  }
  step4() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = true;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.five = false;
  }

  step5() {
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.five = true;
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
    this.data.availableForCall = this.medico4mypatientStep.value.availableForCall;
    this.data.name = this.twoStep.value.name;
    this.data.firstName = this.twoStep.value.firstName;
    this.data.dateBirth = this.twoStep.value.birthday;
    this.data.sex = this.twoStep.value.sex;
    this.data.specialityId = this.threeStep.value.specialityId;
    this.data.professionalLicense = this.threeStep.value.professionalLicense;
    this.data.other = this.threeStep.value.other;
    this.data.professionalLicenseProcedure = this.threeStep.value.professionalLicenseProcedure;
    this.data.email = this.fiveStep.value.email;
    this.data.password = this.fiveStep.value.password;
    this.data.status = true;
    this.data.phone = this.fourStep.value.phoneConsulting;
    this.data.consultingType = this.fourStep.value.consultingType;
    this.data.address = this.fourStep.value.address;
    this.data.stateId = this.fourStep.value.state;

    this.data.createdBy = 0;
    this.data.createdDate = this.today;
    this.data.updatedBy = 0;
    this.data.updatedDate = this.today;
    if (this.data.specialityId === 1) {
      const tempweeklySchedules = [];
      if (this.dayCalendar.length !== 0) {
        this.dayCalendar.forEach(horario => {
          this.catDay.forEach(dia => {
            if (dia.id === horario.dayId) {
              tempweeklySchedules.push(
                {
                  id: horario.id,
                  userId: 0,
                  day: dia.name,
                  timeInit: horario.timeInit,
                  timeEnd: horario.timeEnd
                });
            }
          });
        });
      }
      this.data.weeklySchedules = tempweeklySchedules;
    }
    else {
      this.data.availableForCall = false;
      this.data.weeklySchedules = [];

    }
    console.log('data', this.data);
    this.service.serviceGeneralPostWithUrl('User', this.data).subscribe(resp => {
      if (resp.success) {
        this.title = 'Exito';
        this.body = 'Se creo correctame la cuenta de Medico';
        this.message(this.title, this.body);
        this.router.navigateByUrl('/perfil-user/login');
        this.disabled = false;
        this.ngOnInit();
        this.step1();

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
  addDay() {
    // this.uuid = self.crypto.randomUUID();
    this.uuid = uuidv4();

    if (this.countAttri === 0) {
      this.countAttri = this.countAttri + 1;
    }
    else {
      this.countAttri = this.countAttri + 1;
    }
    this.dayCalendar.push({
      id: this.uuid,
      userId: 0,
      dayId: 0,
      scheduleId: 0,
      timeInit: '00:00',
      timeEnd: '00:00',
      attrHI: 'horaInicia' + this.countAttri,
      attrHF: 'horaFinal' + this.countAttri,
    });
    console.log('recuersos', this.dayCalendar);
  }
  deleteDay(data, index) {
    console.log('index', index);
    console.log('data', data);
    if (this.dayCalendar.length !== 1) {
      this.dayCalendar.splice(index, 1);
    }
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
  async messageHema(title, body) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: e.header,
      message: body,
      buttons: ['Me Sumo a la Red Médica'],
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
  availableForCall: boolean;
  status: true;
  phone: string;
  dateBirth: Date;
  other: string;
  firstName: string;
  consultingType: number;
  stateId: number;
  sex: number;
  address: string;
  institution: number;
  createdBy: number;
  createdDate: Date;
  updatedBy: number;
  updatedDate: Date;
  weeklySchedules: WeeklySchedulesModel[] = [];
}
class WeeklySchedulesModel {
  id: number;
  userId: number;
  day: string;
  timeInit: string;
  timeEnd: string;
}


