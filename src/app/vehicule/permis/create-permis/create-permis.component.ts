import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { CategoriePermis } from '../../models/categoriePermis.model';
import { Pagination } from '../../models/pagination.model';
import { Permis } from '../../models/permis.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

@Component({
  selector: 'app-create-permis',
  templateUrl: './create-permis.component.html',
  styleUrls: ['./create-permis.component.scss']
})
export class CreatePermisComponent implements OnInit {

  categoriePermis?:CategoriePermis[];
  categoriepermis = new CategoriePermis();
  permis?:Permis[];
  permie = new Permis();
  paramsPage: any;
  personals?:Personal[];
  personal=new Personal();
  loading=false;
  submitted = false;
  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private rhService: RhService,
    private vehiculeService: VehiculeServiceService,
  ) { }

  editForm=this.fb.group({
    numeroPermis:['', [Validators.required]],
    dateAcquisition:['', [Validators.required]],
    userId:['', [Validators.required]],
    numeroDossierPermis:['', [Validators.required]],
    typeCategoriePermis:['', [Validators.required]],
    dateDebutPermis:['', [Validators.required]],
    dateFinPermis:['', [Validators.required]],
    categorie_permis_id:['', [Validators.required]],
    permis_id:['', [Validators.required]],
    

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
 

  get f(): any {
    return this.editForm?.controls;
  }

  savepermis(): void {

    this.submitted = true;
    
    this.submitted = false;
    console.log(this.editForm.value);
    const {
      numeroPermis,
      dateAcquisition,
      userId,
      numeroDossierPermis,
      typeCategoriePermis,
      dateDebutPermis,
      categorie_permis_id,
      dateFinPermis} = this.editForm.value;
    this.permie.numeroPermis = numeroPermis;
    this.permie.dateAcquisition = dateAcquisition;
    this.permie.userId = userId;
    // this.permie.pivot!.numeroDossierPermis = numeroDossierPermis;
    // this.permie.pivot!.typeCategoriePermis = typeCategoriePermis;
    // this.permie.pivot!.dateDebutPermis = dateDebutPermis;
    // this.permie.pivot!.dateFinPermis = dateFinPermis;
    this.permie.categorie_permis_id = categorie_permis_id;
   
    if (this.editForm.invalid) {
      return;
    }
  
    
    this.loading = true;
    this.vehiculeService.createPermi(this.permie).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllPersonals();
        this.getListPermi();
       this.getListCategoriePermis();
        this.editForm.reset();
       // $('#createModal').modal('hide');
      },
      error: (error: any) => {
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une erreur s'est produite lors de la creation ",
          'Error'
        );
      },
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


}
