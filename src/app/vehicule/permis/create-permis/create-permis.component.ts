import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPersonal, Personal } from 'src/app/rh/models/personal.model';
import { RhService } from 'src/app/rh/services/rh.service';
import { CategoriePermis, ICategoriePermis } from '../../models/categoriePermis.model';
import { Pagination } from '../../models/pagination.model';
import { IPermis, Permis } from '../../models/permis.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

@Component({
  selector: 'app-create-permis',
  templateUrl: './create-permis.component.html',
  styleUrls: ['./create-permis.component.scss']
})
export class CreatePermisComponent implements OnInit {

  categoriePermis:ICategoriePermis[] =[];
  categoriepermis = new CategoriePermis();
  permis:IPermis[]=[];
  permie = new Permis();
  paramsPage: any;
  personals:IPersonal[]=[];
  personal=new Personal();
  loading=false;
  submitted = false;
  selected!:any [];
  hideArray: Array<boolean>[]=[];
  
  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private rhService: RhService,
    private vehiculeService: VehiculeServiceService,
    private router:Router
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

    this.editForm.get("category")?.valueChanges.subscribe((data:CategoriePermis[])=>{
      if(data){
       ( (this.editForm.controls as any).permiscategories as FormArray).clear();
       
        console.log(data);
        data.forEach((cp : CategoriePermis) => {
          this.addPermiscategorie(cp);
        });
        
        // const selectedPC=(this.editForm.controls as any).permiscategories as FormArray

        // this.editForm.value.permiscategories.forEach((pc:any) => {
        //   const isExist=this.editForm.value.category.find(
        //     (c:any)=>c.id===pc.category.id
        //   )
        //   if(!isExist){
        //     const index=selectedPC.controls.findIndex((x)=>x.value.id===pc.id);
        //     selectedPC.removeAt(index)
        //   }
        // });
        
        console.log(this.editForm.value.category.permiscategories);
        
      }
    })
  }

 addPermiscategorie(category:CategoriePermis) {

  const permiscategorieForm = this.fb.group({
    category_permit_id:[category.id],
    numeroDossierPermis:['', [Validators.required]],
    typeCategoriePermis:['', [Validators.required]],
    dateDebutPermis:['', [Validators.required]],
    dateFinPermis:['', [Validators.required]],
    category:[category],
   
   
  });
/**
 * function pour recuper et afficher l'input
 * push(control) : ajoute un nouveau contrôle à la fin du tableau
 */
  this.permiscategories.push(permiscategorieForm);

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
    if (this.editForm.invalid) {
      return;
    }
  
    
    console.log(this.editForm.value);
    const {
      numeroPermis,
      dateAcquisition,
      userId,
      permiscategories
      } = this.editForm.value;
    this.permie.numeroPermis = numeroPermis;
    this.permie.dateAcquisition = dateAcquisition;
    this.permie.userId = userId;
    this.permie.categories=permiscategories;
  
    if(permiscategories.dateDebutPermis>permiscategories.dateFinPermis){
      this.toastr.error(
        "Une erreur au niveau des dates ",
        'Error'
      );
    }else{
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
         this.router.navigate(['vehicule/permis']);
         this.submitted = false;
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
/////////////////////////////////
/**
 * pour obtenir les donnes du tableau dynamic
 */
 get permiscategories():any {
  return this.editForm.controls["permiscategories"] as FormArray;
}



/**
 * function pour supprimer dynamiquement l'input
 * removeAt
 */




getValues() {
  console.log(this.selected);
}







}
