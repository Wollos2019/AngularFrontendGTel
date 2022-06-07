import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { CategoriePermis } from '../models/categoriePermis.model';
import { Pagination } from '../models/pagination.model';
import { Vehicule } from '../models/vehicule.model';
import { VehiculeServiceService } from '../vehicule-service.service';


declare var $:any
@Component({
  selector: 'app-categorie-permis',
  templateUrl: './categorie-permis.component.html',
  styleUrls: ['./categorie-permis.component.scss']
})
export class CategoriePermisComponent implements OnInit {

  categoriePermis!:CategoriePermis[];
  categoriePermi = new CategoriePermis();
  submitted=false;
  loading= false;
  vehicule = new Vehicule;
  vehicules?:Vehicule[];
  paramsPage: any;
  showCategoriePermis!: CategoriePermis;
  submittedUpdate!: boolean;
  CategoriePermisUpdate!: CategoriePermis;

  constructor(private fb:FormBuilder,
    private vehiculeService: VehiculeServiceService,
    private toastr : ToastrService,) { }

    editForm=this.fb.group({
      libelle:['', [Validators.required]],
     
     
  
    });

    updateCategoriePermisForm=this.fb.group({
      libelle:['', [Validators.required]],
     

    });


  ngOnInit(): void {
    this.getListCategoriePermi();
    
  }

  openModel(): void {
    $('#createModal').modal('show');
  }

  get f(): any {
    return this.editForm?.controls;
  }

  savecategoriepermis(): void {
    console.log("**********************************************************************");
    
    if (this.editForm.invalid) {
      return;
    }
    this.submitted = true;

    console.log(this.editForm.value);
    const {libelle} = this.editForm.value;
    this.categoriePermi.libelle = libelle;
    
    
    
  
    
    this.loading = true;
    this.vehiculeService.createCategoriePermi(this.categoriePermi).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getListCategoriePermi();
        this.editForm.reset();
        $('#createModal').modal('hide');
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


  getListCategoriePermi(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllCategoriePermis (params).subscribe({
      next: (categoriePermis: any) => {
        this.loading = false;
        console.log(categoriePermis);
        this.paramsPage = new Pagination().setPagination(categoriePermis); 
        this.categoriePermis = categoriePermis.data;
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

 


  delete(categoriePermi: any): void {
    this.loading = true;
    var confir = confirm('Voulez vous supprimer cet element?');
    if (confir) {
      this.vehiculeService.deleteCategoriePermi(categoriePermi).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          this.getListCategoriePermi();
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

  // modale pour la mise a jour 
get f1(): any {
  return this.updateCategoriePermisForm?.controls;
}
updateModal(up:CategoriePermis):void {
  $('#updateModal').modal('show');

  console.log('-----------------------------------------------------',up);
  this.CategoriePermisUpdate=up;
  this.updateCategoriePermisForm.get('libelle')?.setValue(up.libelle);
  
 
 
}


update():void{
  if (this.updateCategoriePermisForm.invalid) {
    return;
  }
  this.submittedUpdate = true;
  console.log(this.submittedUpdate);

  const { libelle } = this.updateCategoriePermisForm.value;
  this.CategoriePermisUpdate.libelle = libelle;
  
  this.CategoriePermisUpdate._method="PUT";
  this.loading = true;
  this.vehiculeService.updateCategoriePermi(this.CategoriePermisUpdate).subscribe({
    next: () => {
      this.loading = false;
      this.submittedUpdate = false;
      this.toastr.success('Modification effectué!!');
      this.getListCategoriePermi();
      $('#updateModal').modal('hide');
     
      this.submittedUpdate = false;
     
    },
    error: (error: any) => {
      console.error('Error', error);
      this.loading = false;
      this.toastr.error(
        "Une Erreur c'est produite l'hors de la modification",
        'Error'
      );
    },
  });
}

  
  show(categoriepermis: CategoriePermis): void {
    $('#exampleModal').modal('show');
    this.showCategoriePermis = categoriepermis;
  }


  /**  
   * 
   * @param data 
   */
   getPage(data: any): void {
    console.log(data);
    this.getListCategoriePermi(`page=${data}`);
  }
}
