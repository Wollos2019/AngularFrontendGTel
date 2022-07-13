import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';

import { IPersonal, Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { CategoriePermis, ICategoriePermis } from '../models/categoriePermis.model';
import { Pagination } from '../models/pagination.model';
import { IPermis, Permis } from '../models/permis.model';
import { VehiculeServiceService } from '../vehicule-service.service';

declare var $:any;
@Component({
  selector: 'app-permis',
  templateUrl: './permis.component.html',
  styleUrls: ['./permis.component.scss']
})
export class PermisComponent implements OnInit {

  categoriePermis?:ICategoriePermis[];
  categoriepermis = new CategoriePermis();
  permis?:IPermis[];
  //permie = new Permis();
  paramsPage: any;
  personals?:IPersonal[];
  personal=new Personal();
  loading=false;
  submitted = false;
  showPermis!: Permis;
  array:any[]=[];
  permisUpdate!:boolean;
  submittedUpdate=false
  currentID!: Number;
  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private rhService: RhService,
    private vehiculeService: VehiculeServiceService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    
  ) { }

  editForm=this.fb.group({
    numeroPermis:['', [Validators.required]],
    category:['',[Validators.required]],
    dateAcquisition:['', [Validators.required]],
    userId:['', [Validators.required]],
    permiscategories:this.fb.array([]),
    

  });


  updatePermisForm=this.fb.group({
    numeroPermis:['', [Validators.required]],
    category:['',[Validators.required]],
    dateAcquisition:['', [Validators.required]],
    userId:['', [Validators.required]],
    permiscategories:this.fb.array([]),
    

  });
 

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
  updateModel(permis:Permis): void {
    //$('#createModal').modal('show');
    this.router.navigate(['/vehicule',permis.id,'update-permis']);
    
  }


  getListCategoriePermis():void{
    this.loading=true;
    this.vehiculeService.getAllCategoriePermis().subscribe({
      next:(categoriePermis:any)=>{
        this.loading = false;
        this.categoriePermis = categoriePermis.data;
        console.log(this.categoriePermis);
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
       
        this.paramsPage = new Pagination().setPagination(permis); 
        this.permis = permis.data;
        console.log(this.permis);
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


  // deletePerm(permis: IPermis): void {
  //   this.loading = true;
  //   var confir = confirm('Voulez vous supprimer cet element?');
  //   if (confir) {
  //     this.vehiculeService.deletePermi(permis).subscribe({
  //       next: () => {
  //         this.loading = false;
  //         this.toastr.success('Suppression effectuée');
  //         this.getListPermi();
  //       },
  //       error: (error: any) => {
  //         this.loading = false;
  
  //         console.error('Error', error);
  
  //         this.toastr.error(
  //           "Une Erreur c'est produite l'hors de la suppression",
  //           'Error'
  //         );
  //       },
  //     });
  //   }
  // }
  deletePerm(ev: boolean): void {
    this.loading = true;
   
    if (ev) {
      this.vehiculeService.deletePermi(this.currentID).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          $('#confirm').modal('hide');
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

 

  show(permie: Permis): void {
    $('#exampleModal').modal('show');
    this.showPermis = permie;
    console.log(this.showPermis);
  }
  // show(fournisseur: Fournisseur): void {
  //   $('#exampleModal').modal('show');
   
    
  //   this.showFournisseur = fournisseur;
  //   console.log(this.showFournisseur);
  // }
  

  /**  
   * 
   * @param data 
   */
  getPage(data: any): void {
   
    this.getListPermi(`page=${data}`);
  }

  asArra(ar:ICategoriePermis[] | undefined):ICategoriePermis[]{
    return (ar as ICategoriePermis[])
  }

  openModalConfirm(id?: number): void {
    this.currentID = Number(id);
    console.log("ggggggggggggggg",this.currentID!);
    $('#confirm').modal('show');
  }

}
