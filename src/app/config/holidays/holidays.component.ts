import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HoliDay } from '../model/holiDay.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  loading=false;
  holiDay?:HoliDay;
  holiDays?:HoliDay[];
  currentYear=2022;

  constructor(
    private configService:ConfigService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getHoliDay(this.currentYear);
  }


  getHoliDay(year:number):void{
    this.loading=true;
    this.configService.getAllHoliDayByYearSession(year).subscribe({
      next:(data:HoliDay[])=>{
        if(data){
          console.log(data);
          this.holiDays=data;
        }else{
          this.holiDays=[];
        }
       
        this.loading=false;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
        this.loading=false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      }
    })
  }
  next():void{
    this.currentYear=this.currentYear+1;
  this.getHoliDay(this.currentYear);
  }

  prev():void{
    this.currentYear=this.currentYear-1;
    this.getHoliDay(this.currentYear);
  }
}
