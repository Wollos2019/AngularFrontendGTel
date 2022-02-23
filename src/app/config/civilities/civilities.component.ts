import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Civility } from '../model/civility.model';
import { Department } from '../model/department.model';
import { ConfigService } from '../services/config.service';
declare var $: any;
@Component({
  selector: 'app-civilities',
  templateUrl: './civilities.component.html',
  styleUrls: ['./civilities.component.scss'],
})
export class CivilitiesComponent implements OnInit {
  editForm = this.fb.group({
    name: [null, [Validators.required]],
    abbreviation:[null],
    description: [null],
  });
  submitted = false;
  civilities?: Civility[];
  civility = new Civility();
  loading = false;
  civilityId?: number;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getAllCivilities();
  }
  get f(): any {
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    this.submitted = false;
    console.log(this.editForm.value);
    const { name, description,abbreviation } = this.editForm.value;
    this.civility.description = description;
    this.civility.name = name;
    this.civility.abbreviation=abbreviation;
    this.loading = true;
    this.configService.createCivility(this.civility).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllCivilities();
        this.editForm.reset();
        $('#modalDepartment').modal('hide');
      },
      error: (error) => {
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la création",
          'Error'
        );
      },
    });
  }

  getAllCivilities(params = ''): void {
    this.loading = true;
    this.configService.getAllCivilities(params).subscribe({
      next: (civilities: any) => {
        this.loading = false;
        console.log(civilities);
        this.civilities = civilities.data;
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

  openModalConfirm(id?:number):void{
    this.civilityId=id;
    $('#confirm').modal('show');
  }
  deleteC(ev:boolean):void{
    this.loading=true;
    if(ev===true){
      $('#confirm').modal('hide');
      console.log(this.civilityId);
      
      this.configService.deleteCivility(Number(this.civilityId)).subscribe(
        {
          next:()=>{
            this.toastr.success('Suppression effectué !!');
            this.loading=false;
            this.getAllCivilities();
          },
          error:(responseError:HttpErrorResponse)=>{
            this.loading=false;
            console.log(responseError);
            if(responseError.error.code==409){
              this.toastr.error(
                responseError.error.errors,
                'Error'
              );
            }else{
              this.toastr.error(
                "Une Erreur c'est produite l'hors de la suppression",
                'Error'
              );
            }
            
           
           
          }
        }
      );
    }
    
  }
}
