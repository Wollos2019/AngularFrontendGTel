
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assurance } from 'src/app/assurence/model/assurance.model';
import { Vehicule } from '../models/vehicule.model';

import { VehiculeServiceService } from '../vehicule-service.service';


@Component({
  selector: 'app-detail-vehicule',
  templateUrl: './detail-vehicule.component.html',
  styleUrls: ['./detail-vehicule.component.scss']
})
export class DetailVehiculeComponent implements OnInit {
  vehicules:Vehicule[]=[]
  vehicule = new Vehicule
  assurances:Assurance[]=[]
  assurance= new Assurance()

 items?:any[]
  loading= false;
  constructor(private vehiculeService:VehiculeServiceService,
              private toastr:ToastrService,
              private route:ActivatedRoute){}

  ngOnInit(): void {
    //this.getsingleVehicule(this.route.snapshot.params['id']);
    this.getListVehicule(this.route.snapshot.params['id']);
  }

 

  getListVehicule(vehiculeId: number):void{
    this.loading = true;
     this.vehiculeService.getOneVehicule(vehiculeId).subscribe({
      next: (vehicule: any) => {
        this.loading = false;
       //console.log(vehicule);
     //this.vehicule= JSON.parse(JSON.stringify(vehicule.object));
        this.vehicule = vehicule;
        //this.items = Object.values(this.vehicule);
        //console.log("Item data:"+this.items);
        console.log('fffffffffffffffffffffffffffffffff',this.vehicule);
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


