import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Pagination } from '../models/pagination.model';
import { IVehicule, Vehicule } from '../models/vehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';

@Component({
  selector: 'app-statistique-vehicule',
  templateUrl: './statistique-vehicule.component.html',
  styleUrls: ['./statistique-vehicule.component.scss']
})
export class StatistiqueVehiculeComponent implements OnInit {
  vehicules: Vehicule[]=[];
  vehicule = new Vehicule();
  paramsPage:any;
  resultat?:any[]
  constructor(private vehiculeService:VehiculeServiceService,
    private toastr:ToastrService,) { }
  submitted = false;
  loading = false;
  ngOnInit(): void {
    this.getListVehicule();
  }
  getListVehicule(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllVehicules(params).subscribe({
      next: (vehicules: any) => {
        this.loading = false;
        //console.log(vehicules);

        this.paramsPage = new Pagination().setPagination(vehicules); 
          //this.resultat = vehicules.data;

        this.vehicule = vehicules.data;
        console.log(this.vehicule.libelleVehicule);

      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error', error);
  
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }
  
}
