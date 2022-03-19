import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Absence } from 'src/app/config/model/absence.model';
import { HoliDay } from 'src/app/config/model/holiDay.model';
import { Session } from 'src/app/config/model/sessions.model';
import { WorkingDay, STATUS } from 'src/app/config/model/working_days.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { compareDate } from 'src/app/util/function_date';
import {
  dayMonthHolidayYearCurrent,
  NombreJourMois,
} from 'src/app/util/getDayInMonth';
import { Personal } from '../models/personal.model';
import { RhService } from '../services/rh.service';
declare var $: any;
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.scss'],
})
export class LeaveRequestsComponent implements OnInit {
  currentYear = 2022;
  currentMonth = 1;
  month = [
    { id: 1, value: 'janvier' },
    { id: 2, value: 'Fevrier' },
    { id: 3, value: 'Mars' },
    { id: 4, value: 'Avril' },
    { id: 5, value: 'Mai' },
    { id: 6, value: 'Juin' },
    { id: 7, value: 'Juillet' },
    { id: 8, value: 'Aôut' },
    { id: 9, value: 'Septembre' },
    { id: 10, value: 'Octobre' },
    { id: 11, value: 'novembre' },
    { id: 12, value: 'Decembre' },
  ];
  users = [{ name: 'Pascal' }, { name: 'Ngongang' }];
  nombreDay!: { name: string; key: number }[];
  holiDays!: HoliDay[];
  loading = false;
  workingDays!: WorkingDay[];
  personals!: Personal[];
  sessions!: Session[];
  absences!: Absence[];
  submitted = false;
  editForm = this.fb.group({
    type: ['', [Validators.required]],
    to: ['', [Validators.required]],
    from: ['', [Validators.required]],
    name: [{ value: '', disabled: true }, [Validators.required]],
    note: [''],
    status: ['', [Validators.required]],
  });
  constructor(
    private configService: ConfigService,
    private toastr: ToastrService,
    private rhService: RhService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nombreDay = [];
    for (let index = 0; index < NombreJourMois(0, this.currentYear); index++) {
      let day = new Date(
        '01/' + (index + 1) + '/' + this.currentYear
      ).toLocaleString('en-us', { weekday: 'long' });

      this.nombreDay.push({ name: day, key: index + 1 });
    }
    // console.log(this.nombreDay);

    this.getHoliDay(this.currentYear);
    this.getWorkingDay();
    this.getAllEmployees();
    this.getSession();
    this.getAllAbsences();
  }
  next(): void {
    this.currentMonth = this.currentMonth + 1;
  }

  prev(): void {
    this.currentMonth = this.currentMonth - 1;
  }

  getHoli(month: number, day: number): { class: string; isTrue: boolean } {
    let holi = dayMonthHolidayYearCurrent(this.holiDays);

    for (let index = 0; index < holi.length; index++) {
      const element = holi[index];
      if (element.day === day && month === element.month) {
        return { class: 'day-holi', isTrue: true };
      }
    }

    return { class: 'day', isTrue: false };
  }
  getHoliDay(year: number): void {
    this.loading = true;
    this.configService.getAllHoliDayByYearSession(year).subscribe({
      next: (data: HoliDay[]) => {
        // console.log(dayMonthHolidayYearCurrent(data));
        this.holiDays = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des données ",
          'Error'
        );
      },
    });
  }

  getAllAbsences(): void {
    this.loading = true;
    this.configService.getAllAbsences('per_page=*').subscribe({
      next: (data: Absence[]) => {
        // console.log(dayMonthHolidayYearCurrent(data));
        this.absences = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des données ",
          'Error'
        );
      },
    });
  }

  getWorking(day: string): { class: string; isTrue: boolean } {
    // console.log(day, this.workingDays);

    for (let index = 0; index < this.workingDays.length; index++) {
      const element = this.workingDays[index];
      if (element.day === day && element.status === STATUS.DISABLE) {
        return { class: 'day-not-working', isTrue: true };
      }
    }

    return { class: 'day', isTrue: false };
  }

  getWorkingDay(): void {
    this.loading = true;
    this.configService.getAllWorkings().subscribe({
      next: (data: WorkingDay[]) => {
        this.workingDays = data;
        this.loading = false;
        console.log(this.workingDays);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }

  getSession(): void {
    this.configService.getAllSessions().subscribe({
      next: (data: Session[]) => {
        this.sessions = data;
        console.log(this.sessions);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }

  getAllEmployees(): void {
    this.loading = true;
    this.rhService.getAllPersonals('per_page=*').subscribe({
      next: (personals: any) => {
        this.personals = personals;
        console.log(personals);

        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }

  getMonthString(id?: number): any {
    this.nombreDay = [];
    for (
      let index = 0;
      index < NombreJourMois(this.currentMonth - 1, this.currentYear);
      index++
    ) {
      let day = new Date(
        id + '/' + (index + 1) + '/' + this.currentYear
      ).toLocaleString('en-us', { weekday: 'long' });
      this.nombreDay.push({ name: day, key: index + 1 });
      // console.log(this.nombreDay);
    }

    return this.month.find((m) => m?.id === id)?.value;
  }

  getUser(day: any, user: any, holi: boolean, working: boolean): void {
    console.log(holi, working);
    this.editForm.get('name')?.setValue(user.name);
    if (holi) {
      this.toastr.info('ce jour un est jour férié !!', 'Info');
    } else if (working) {
      this.toastr.info('ce jour un est jour non ouvrable !!', 'Info');
    } else if (holi && working) {
      this.toastr.info(
        'ce jour un est jour non ouvrable et un jour férié !!',
        'Info'
      );
    } else {
      $('#modalLeave').modal('show');
    }
  }

  get f(): any {
    return this.editForm?.controls;
  }

  save(): void {
    this.submitted = true;
    const { to, from } = this.editForm.value;
    console.log(new Date(from).getDate() - new Date(to).getDate());
    let inter = new Date(from).getDate() - new Date(to).getDate();
    for (let i = 0; i < inter; i++) {
      console.log(new Date(to).getDate() + (i + 1));
    }
    if (this.editForm.invalid) {
      return;
    }
    console.log();

    if (compareDate(to, from)) {
      this.toastr.warning(
        'La date de fin doit être inferieure a la date de debut !!',
        'Attaction'
      );
      return;
    }
    $('#modalLeave').modal('hide');
  }
}
