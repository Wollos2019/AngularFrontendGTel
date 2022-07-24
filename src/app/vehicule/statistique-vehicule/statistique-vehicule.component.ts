import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IStatistiqueVehicule } from '../models/statistiqueVehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';

@Component({
  selector: 'app-statistique-vehicule',
  templateUrl: './statistique-vehicule.component.html',
  styleUrls: ['./statistique-vehicule.component.scss']
})
export class StatistiqueVehiculeComponent implements OnInit {
  data!: IStatistiqueVehicule;
  constructor(private vehiculeService:VehiculeServiceService,
    private toastr:ToastrService,
   ) { }
  submitted = false;
  loading = false;
  ngOnInit(): void {
   this.getStatistique();
  }
  
  getStatistique(): void {
    this.vehiculeService.getStatistiqueVehicule().subscribe({
      next: (response: IStatistiqueVehicule) => {
        this.data = response;
        console.log(this.data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error("une erreur c'est produite", 'Error');
      },
    });
  }

 
}
