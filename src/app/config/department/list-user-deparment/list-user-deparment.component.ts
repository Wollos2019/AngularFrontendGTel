import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/rh/models/personal.model';
import { getImage } from 'src/app/util/images';
import { Department } from '../../model/department.model';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-list-user-deparment',
  templateUrl: './list-user-deparment.component.html',
  styleUrls: ['./list-user-deparment.component.scss']
})
export class ListUserDeparmentComponent implements OnInit {
  departemntId: any;
  loading=false;
  personal=new Personal();
  data!: {department:Department,employees:Personal[]};
  images:any;
  constructor(private activeRoute:ActivatedRoute,private toastr: ToastrService,
    private configService:ConfigService) { }

  ngOnInit(): void {
    this.departemntId=this.activeRoute.snapshot.params['id'];
    this.getEmployeeDepartment();
    this.images=getImage();
  }

  getEmployeeDepartment():void{
    this.loading=true;
    this.configService.getAllEmployeesDepartment(this.departemntId).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.data=data;
    this.loading=false;
        
      },
      error:()=>{
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recuperation des données",
          'Error'
        );
    this.loading=false;

      }
    })
  }

}
