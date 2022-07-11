import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination.model';
import { IUnitMesure, UnitMesure } from '../../models/unitMesure.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

@Component({
  selector: 'app-unity-mesure',
  templateUrl: './unity-mesure.component.html',
  styleUrls: ['./unity-mesure.component.scss']
})
export class UnityMesureComponent implements OnInit {

  unitMesures:IUnitMesure[]=[];
  uniteMesure= new UnitMesure()
  submitted=false;
  loading=false;
  paramsPage: any;
  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
    private vehiculeService:VehiculeServiceService) { }


    editForm=this.fb.group({
      libelleUniteMesure:['', [Validators.required]],
      symboleUniteMesure:['',[Validators.required,Validators.maxLength(4)]],
     
      
    });
  ngOnInit(): void {
    this.getAllMesures();
    
  }

  get f(): any {
    return this.editForm?.controls;
  }

  saveUnite(): void {

    this.submitted = true;
    
    if (this.editForm.invalid) {
      return;
    }
   // this.submitted = false;
    console.log(this.editForm.value);
    const {
      libelleUniteMesure,
      symboleUniteMesure,
     
      
      } = this.editForm.value;
      this.uniteMesure.libelleUniteMesure = libelleUniteMesure;
      this.uniteMesure.symboleUniteMesure = symboleUniteMesure;
     
      
    //this.panne.categories=permiscategories;
  

   
   
  
    
    this.loading = true;
    this.vehiculeService.createUniteMesure(this.uniteMesure).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllMesures();
      
        this.editForm.reset();
       // $('#createModal').modal('hide');
       this.submitted=false
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


  getAllMesures(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllUniteMesures(params).subscribe({
      next: (unitMesures: any) => {
        this.loading = false;
        console.log(unitMesures);
        this.paramsPage = new Pagination().setPagination(unitMesures); 
        this.unitMesures = unitMesures.data;
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


  delete(uniteMesureId: IUnitMesure): void {
    this.loading = true;
    var confir = confirm('Voulez vous supprimer cet element?');
    if (confir) {
      this.vehiculeService.deleteUniteMesure(uniteMesureId).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          this.getAllMesures();
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

  /**  
   * 
   * @param params 
   */
   getPage(params: any): void {
    console.log(params);
    this.getAllMesures(`page=${params}`);
  }

}
