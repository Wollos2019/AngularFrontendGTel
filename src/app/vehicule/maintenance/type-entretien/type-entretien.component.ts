import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../models/pagination.model';
import { ITypeEntretien, TypeEntretien } from '../../models/typeEntretien.model';
import { VehiculeServiceService } from '../../vehicule-service.service';

declare var $:any
@Component({
  selector: 'app-type-entretien',
  templateUrl: './type-entretien.component.html',
  styleUrls: ['./type-entretien.component.scss']
})
export class TypeEntretienComponent implements OnInit {
 

  typeEntretiens?:TypeEntretien[]=[];
 tyEntre = new TypeEntretien();
 currrentID!:number;
  submitted=false;
  loading=false;
  paramsPage: any;
  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
    private vehiculeService:VehiculeServiceService) { }



    editForm=this.fb.group({
      libelleTypeEntretien:['', [Validators.required]],
      descriptionTypeEntretien:['',[Validators.required]],
     // unitMesureId:['',[Validators.required]],
     
      
    });

  ngOnInit(): void {
   this.getAllEntretiens()
  }

  get f(): any {
    return this.editForm?.controls;
  }

  saveEntretien(): void {

    this.submitted = true;
    
    if (this.editForm.invalid) {
      return;
    }
   // this.submitted = false;
    console.log(this.editForm.value);
    const {
      libelleTypeEntretien,
      descriptionTypeEntretien,
      //unitMesureId
     
      
      } = this.editForm.value;
      this.tyEntre.libelleTypeEntretien = libelleTypeEntretien;
      this.tyEntre.descriptionTypeEntretien = descriptionTypeEntretien;
     // this.typeEntretien.unitMesureId = unitMesureId;
    
    this.loading = true;
    this.vehiculeService.createTypeEntretien(this.tyEntre).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectuée !!');
        this.getAllEntretiens();
      
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


  getAllEntretiens(params=''):void{
    this.loading = true;
    this.vehiculeService.getAllTypeEntretiens(params).subscribe({
      next: (typeEntretiens: any) => {
        this.loading = false;
        console.log(typeEntretiens);
        this.paramsPage = new Pagination().setPagination(typeEntretiens); 
        this.typeEntretiens = typeEntretiens.data;
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


  deleteType(ev: boolean,): void {
    this.loading = true;
   
   // var confir = confirm('Voulez vous supprimer cet element?');
    if (ev) {
     
     
      this.vehiculeService.deleteTypeEntretien(this.currrentID).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Suppression effectuée');
          $('#confirm').modal('hide');
          this.getAllEntretiens();
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
    this.getAllEntretiens(`page=${params}`);
  }

  openModalConfirm(id?: number): void {
    this.currrentID = Number(id);
    console.log("ggggggggggggggg",this.currrentID!);
    $('#confirm').modal('show');
  }



  
}
