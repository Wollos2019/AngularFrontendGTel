import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';

import { Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { CategoriePermis } from '../models/categoriePermis.model';
import { Pagination } from '../models/pagination.model';
import { Permis } from '../models/permis.model';
import { VehiculeServiceService } from '../vehicule-service.service';

declare var $:any;
@Component({
  selector: 'app-permis',
  templateUrl: './permis.component.html',
  styleUrls: ['./permis.component.scss']
})
export class PermisComponent implements OnInit {

  categoriePermis?:CategoriePermis[];
  categoriepermis = new CategoriePermis();
  permis?:Permis[];
  permie = new Permis();
  paramsPage: any;
  personals?:Personal[];
  personal=new Personal();
  loading=false;
  submitted = false;
  showPermis: any;
  array:any[]=[];
  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private rhService: RhService,
    private vehiculeService: VehiculeServiceService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    
  ) { }


 
 

  ngOnInit(): void {
    this.getAllPersonals();
    this.getListPermi();
    this.getListCategoriePermis();
  }
  getAllPersonals(params=''):void{
    this.loading = true;
    this.rhService.getAllPersonals(params).subscribe({
      next: (personals: any) => {
        this.loading = false;
        console.log(personals);
        this.personals = personals.data;
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

  openModel(): void {
    //$('#createModal').modal('show');
    this.router.navigate(['vehicule/create-permis']);
    
  }


  getListCategoriePermis():void{
    this.loading=true;
    this.vehiculeService.getAllCategoriePermis().subscribe({
      next:(categoriePermis:any)=>{
        this.loading = false;
        console.log(categoriePermis);
        this.categoriePermis = categoriePermis.data;
      },
      error:(error:any)=>{
        this.loading = false;
        console.error('Error', error);

        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      }
    });
  }
 


  getListPermi(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllPermis (params).subscribe({
      next: (permis: any) => {
        this.loading = false;
        console.log(permis);
        this.paramsPage = new Pagination().setPagination(permis); 
        this.permis = permis.data;
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


  deletePerm(id: number): void {
    this.loading = true;
    var confir = confirm('Voulez vous supprimer cet element?');
    if (confir) {
      this.vehiculeService.deletePermi(id).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          this.getListPermi();
        },
        error: (error: any) => {
          this.loading = false;
  
          console.error('Error', error);
  
          this.toastr.error(
            "Une Erreur c'est produite l'hors de la suppression",
            'Error'
          );
        },
      });
    }
  }

  show(permis: Permis): void {
    $('#exampleModal').modal('show');
    this.showPermis = permis;
  }
  

  /**  
   * 
   * @param data 
   */
  getPage(data: any): void {
    console.log(data);
    this.getListPermi(`page=${data}`);
  }
}
