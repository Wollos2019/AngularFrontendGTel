import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HoliDay } from 'src/app/config/model/holiDay.model';
import { ConfigService } from 'src/app/config/services/config.service';
import {
  dayMonthHolidayYearCurrent,
  NombreJourMois,
} from 'src/app/util/getDayInMonth';
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
  nombreDay!: number[];
  holiDays!: HoliDay[];
  loading = false;
  constructor(
    private configService: ConfigService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.nombreDay = [];
    for (let index = 0; index < NombreJourMois(0, this.currentYear); index++) {
      this.nombreDay.push(index + 1);
    }
    this.getHoliDay(this.currentYear);
  }
  next(): void {
    this.currentMonth = this.currentMonth + 1;
  }

  prev(): void {
    this.currentMonth = this.currentMonth - 1;
  }

  getHoli(month: number, day: number): string {
    let holi = dayMonthHolidayYearCurrent(this.holiDays);

    for (let index = 0; index < holi.length; index++) {
      const element = holi[index];
      if (element.day === day && month === element.month) {
        return 'day-holi';
      }
    }

    return 'day';
  }
  getHoliDay(year: number): void {
    this.loading = true;
    this.configService.getAllHoliDayByYearSession(year).subscribe({
      next: (data: HoliDay[]) => {
        console.log(dayMonthHolidayYearCurrent(data));
        this.holiDays = data;
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
      this.nombreDay.push(index + 1);
    }

    return this.month.find((m) => m?.id === id)?.value;
  }

  getUser(day: any, user: any): void {
    console.log(day, user);
    $('#modalLeave').modal('show');
  }
}
