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

  public knobValues: any;
  // public data: UserModel = new UserModel();
  public data: any;
  public disabledd = true;
  public medicalType = '';
  public oneScreen = true;
  public twoScreen = false;
  public threeScreen = false;
  public fourScreen = false;
  public sixScreen = false;
  public today = new Date();
  public title = '';
  public body = '';
  public createDate = '';
  public especialidades;
  public consultorio;
  public catDay;
  public schedule;
  public catState;
  public optionDay;
  public countAttri = 1000;
  public horario4mypatient = false;


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
  medico4mypatientStep = this.formBuilder.group({
    availableForCall: ['false'],
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
  // ionViewWillEnter() {
  //   this.user = JSON.parse(localStorage.getItem('userData'));
  //   console.log('user ionViewWillEnter', this.user);
  //   this.getData(this.user.id);
  //   this.getEspecialidades();
  //   this.getConsultorio();
  //   this.getDay();
  //   this.getState();

  // }
  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('user ngOnInit', this.user);
    this.getData(this.user.id);
    this.getEspecialidades();
    this.getConsultorio();
    this.getDay();
    this.getState();
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
        this.medico4mypatientStep = this.formBuilder.group({
          availableForCall: [this.data.user.availableForCall, Validators.required],
        });
        this.getSchedule();
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
    this.ngOnInit();
  }
  addDay() {
    if (this.countAttri === 1000) {
      this.countAttri = this.countAttri + 1;
    }
    else {
      this.countAttri = this.countAttri + 1;
    }
    this.dayCalendar.push({
      id: 0,
      userId: this.data.user.id,
      day: 0,
      scheduleId: 0,
      timeInit: '00:00',
      timeEnd: '00:00',
      attrHI: 'horaInicia' + this.countAttri,
      attrHF: 'horaFinal' + this.countAttri,
      status: 'new'
    });
    console.log('recuersos', this.dayCalendar);
  }
  deleteDay(data, index) {
    console.log('index', index);
    console.log('data', data);
    if (data.status === 'old') {
      this.service.serviceGeneralDelete(`User/delete-weekly-schedule?guid=${data.id}`).subscribe(resp => {
        if (resp.success) {
          console.log('resp delete calendar', resp.result);
          this.getData(this.user.id);
          this.dayCalendar = [];
        }
      });
    }
    else {
      if (this.dayCalendar.length !== 0) {
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
    this.ngOnInit();
    this.router.navigateByUrl('/perfil-doctor/home');
    this.step1();
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
    this.dayCalendar = [];
    this.service.serviceGeneralGet(`User/all-weekly-schedule?userId=${this.user.id}`).subscribe(resp => {
      if (resp.success) {
        this.schedule = resp.result;
        console.log('servicio', this.schedule);
        if (this.schedule.length !== 0) {
          if (this.countAttri === 1000) {
            this.countAttri = this.countAttri + 1;
          }
          this.schedule.forEach(element => {
            this.catDay.forEach(dia => {
              if (dia.name === element.day) {
                this.dayCalendar.push({
                  id: element.id,
                  userId: element.userId,
                  day: dia.id,
                  timeInit: element.timeInit,
                  timeEnd: element.timeEnd,
                  attrHI: 'horaInicia' + this.countAttri,
                  attrHF: 'horaFinal' + this.countAttri,
                  status: 'old'
                });
                this.countAttri = this.countAttri + 1;
              }
            });
          });
        }
        console.log('dayCalendar', this.dayCalendar);
      }
    });
  }

  step1() {
    console.log('paso 1');
    this.oneScreen = true;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.sixScreen = false;
  }
  step2() {
    console.log('paso 2');
    this.oneScreen = false;
    this.twoScreen = true;
    this.threeScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.fourScreen = false;
    this.sixScreen = false;
  }
  // desicion
  step3(direccion: string) {
    console.log(direccion);
    if (direccion === 'adelante') {
      this.oneScreen = false;
      this.twoScreen = false;
      this.threeScreen = true;
      this.medico4mypatient = false;
      this.horario4mypatient = false;
      this.fourScreen = false;
      this.sixScreen = false;
    }
    else if (direccion === 'atrasHemato') {
      this.threeScreen = true;
      this.medico4mypatient = false;
      this.oneScreen = false;
      this.twoScreen = false;
      this.horario4mypatient = false;
      this.fourScreen = false;
      this.sixScreen = false;
    }
    else {
      this.oneScreen = false;
      this.twoScreen = false;
      this.fourScreen = false;
      if (this.threeStep.value.specialityId === 1) {
        if (this.medico4mypatientStep.value.availableForCall === true) {
          this.horario4mypatient = true;
          this.medico4mypatient = false;
          this.getSchedule();
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
    this.sixScreen = false;
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
    console.log('paso 4');
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = true;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
    this.sixScreen = false;
  }



  step6() {
    console.log('paso 6, guardar calendario');
    // this.saveCalendar();
    this.oneScreen = false;
    this.twoScreen = false;
    this.threeScreen = false;
    this.fourScreen = false;
    this.medico4mypatient = false;
    this.horario4mypatient = false;
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
  saveCalendar() {
    if (this.data.user.availableForCall === true) {

      const addtempweeklySchedules = [];
      const updatetempweeklySchedules = [];
      if (this.data.user.specialityId === 1) {
        if (this.dayCalendar.length !== 0) {
          this.dayCalendar.forEach(calendario => {
            this.catDay.forEach(dia => {
              if (calendario.status === 'new') {
                // add
                if (dia.id === calendario.day) {
                  addtempweeklySchedules.push(
                    {
                      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                      userId: calendario.userId,
                      day: dia.name,
                      timeInit: calendario.timeInit,
                      timeEnd: calendario.timeEnd
                    });
                }
              }
              else {
                // update
                if (dia.id === calendario.day) {
                  updatetempweeklySchedules.push(
                    {
                      id: calendario.id,
                      userId: calendario.userId,
                      day: dia.name,
                      timeInit: calendario.timeInit,
                      timeEnd: calendario.timeEnd
                    });
                }
              }
            });
          });
        }
      }
      else {
        this.title = 'Error';
        this.body = 'No haz aceptado ser parte de la red 4myPatient';
        this.message(this.title, this.body);
      }

      let numPost = 0;
      let numErr = 0;
      if (addtempweeklySchedules.length !== 0) {

        addtempweeklySchedules.forEach(element => {
          this.service.serviceGeneralPostWithUrl(`User/add-weekly-schedule`, element).subscribe(resp => {
            if (resp.success) {
              numPost = numPost + 1;
            } else {
              numErr = numErr + 1;
            }
          },
            (error) => {
              console.log(error);
              this.title = 'Error';
              this.message(this.title, error.error.message);
            });
        });
        if (numPost === addtempweeklySchedules.length) {
          this.title = 'Exito';
          this.body = 'Se guardo la disponibilidad de atención correctame';
          this.message(this.title, this.body);
        }
        if (numErr === addtempweeklySchedules.length) {
          this.title = 'Error';
          this.body = 'Tenemos problemas intentelo mas tarde';
          this.message(this.title, this.body);
        }
      }

      let numUpdate = 0;
      let numUpdateErr = 0;
      if (updatetempweeklySchedules.length !== 0) {
        updatetempweeklySchedules.forEach(element => {
          this.service.serviceGeneralPut(`User/update-weekly-schedule`, element).subscribe(resp => {
            if (resp.success) {
              numUpdate = numUpdate + 1;
            } else {
              numUpdateErr = numUpdateErr + 1;
            }
          },
            (error) => {
              console.log(error);
              this.title = 'Error';
              this.message(this.title, error.error.message);
            });
        });
        if (numUpdate === updatetempweeklySchedules.length) {
          this.title = 'Exito';
          this.body = 'Se guardo la disponibilidad de atención correctame';
          this.message(this.title, this.body);
        }
        if (numUpdateErr === updatetempweeklySchedules.length) {
          this.title = 'Error';
          this.body = 'Tenemos problemas intentelo mas tarde';
          this.message(this.title, this.body);
        }
      }
      this.ngOnInit();
    }
    else {
      this.title = 'Atención';
      this.body = 'Seleccione que acepta unirse a la Red Médica,guade su perfil y despues agregue los horarios de Disponibilidad';
      this.message(this.title, this.body);
    }
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
    this.data.user.availableForCall = this.medico4mypatientStep.value.availableForCall;
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
  changePassword() {
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



