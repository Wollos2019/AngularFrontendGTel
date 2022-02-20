import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IDashboard } from './dasboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data!: IDashboard;

  constructor(private dashboradService:DashboardService,private toarst:ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    this.dashboradService.getDashboard().subscribe({
      next:(response:IDashboard)=>{
        this.data=response;
        console.log(this.data);
        
      },error:(error:HttpErrorResponse)=>{
        console.log(error);
        this.toarst.error('une erreur c\'est produite','Error');
      }
    })
  }
}
