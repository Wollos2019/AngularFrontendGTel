import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Civility } from 'src/app/config/model/civility.model';
import { Country } from 'src/app/config/model/countries.model';
import { Department } from 'src/app/config/model/department.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { getImage } from 'src/app/util/images';
import { CONTRACT, GENDER, MARITAL, Personal } from '../../models/personal.model';
import { RhService } from '../../services/rh.service';

@Component({
  selector: 'app-personal-profil',
  templateUrl: './personal-profil.component.html',
  styleUrls: ['./personal-profil.component.scss']
})
export class PersonalProfilComponent implements OnInit {
  personalId?: number;
  images?: any;
  personal?: Personal;
  loading=false;
  submitted=false;
  per = new Personal();
  departemnts!: Department[];
  editForm = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: [''],
    email: [''],
    sexe: [GENDER.MALE,[Validators.required]],
    cni:['',[Validators.required]],
    cnps:[''],
    matrimonial:['',[Validators.required]],
    town:[''],
    country:[{value:'', disabled:true},[Validators.required]],
    address:[''],
    phone:[''],
    numberChild:[0],
    dateNaissance:['',[Validators.required]],
    civilite:[{value:'', disabled:true},[Validators.required]],
    departmentId:[{value:'', disabled:true},[Validators.required]],
    salaire:['',[Validators.required]],
    fonction:['',[Validators.required]],
    contrat:['',[Validators.required]],
    dateStart:['',[Validators.required]],
    dateEnd:[''],
    password:[''],
    email1:[''],
    placeBirth:['']
  });
  countries!: Country[];
  civilities!: Civility[];
  MARITAL=MARITAL;
  GENDER=GENDER;
  CONTRACT=CONTRACT;
  constructor(private activeRoute: ActivatedRoute, private rhService: RhService, private fb: FormBuilder,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.personalId = this.activeRoute.snapshot.params['personalId'];
    console.log(this.activeRoute.snapshot);
    this.images = getImage();
    this.getPersonale();
    this.getCountry();
    this.getAllCivilities();
    this.getAllDepartments();

  }
  get f(): any {
    console.log(this.editForm?.controls);
    
    return this.editForm?.controls;
  }
  getPersonale(): void {
    this.rhService.getOnePersonal(Number(this.personalId)).subscribe({
      next: (personal: Personal) => {
        this.personal = personal;
        console.log(this.personal);
        this.initForm(personal);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);


      }
    })
  }
  getCountry():void{
    this.configService.getAllCountries('per_page=*').subscribe({
      next:(countries:Country[])=>{
        this.countries=countries;
        this.editForm.get('country')?.enable();
          this.editForm.updateValueAndValidity();
        console.log(countries);

      },
      error:(error:HttpErrorResponse)=>{
        console.log('Error',error);
        
      }
    })
  }
  getAllCivilities():void{
    this.configService.getAllCivilities('per_page=*').subscribe({
      next:(civilities:Civility[])=>{
        this.civilities=civilities;
        this.editForm.get('civilite')?.enable();
        this.editForm.updateValueAndValidity();
     
        console.log(civilities);
        
      },
      error:(error:HttpErrorResponse)=>{
        console.log('Error',error);
        
      }
    })
  }

  getAllDepartments():void{
    this.configService.getAllDepartments('per_page=*').subscribe({
      next:(departemnts:Department[])=>{
        this.departemnts=departemnts;
        this.editForm.get('departmentId')?.enable();
        this.editForm.updateValueAndValidity();
      
        console.log('departemnts',departemnts);
        
      },
      error:(error:HttpErrorResponse)=>{
        console.log('Error',error);
        
      }
    })
  }

  initForm(personal:Personal):void{
    this.editForm.get('civilite')?.setValue(personal.civilityId);
    this.editForm.get('lastname')?.setValue(personal.lastname);
    this.editForm.get('firstname')?.setValue(personal.firstname);
    this.editForm.get('email')?.setValue(personal.email);
    this.editForm.get('sexe')?.setValue(personal.gender);
    this.editForm.get('cni')?.setValue(personal.cni);
    this.editForm.get('cnps')?.setValue(personal.cnps);
    this.editForm.get('numberChild')?.setValue(personal.numberChild);
    this.editForm.get('dateNaissance')?.setValue(personal.birthday);
    this.editForm.get('matrimonial')?.setValue(personal.marital);
    this.editForm.get('placeBorn')?.setValue(personal.marital);
    this.editForm.get('placeBirth')?.setValue(personal.placeBirth);
    this.editForm.get('phone')?.setValue(personal.phone);
    this.editForm.get('country')?.setValue(personal.country);
    this.editForm.get('town')?.setValue(personal.town);
    this.editForm.get('address')?.setValue(personal.address);
    this.editForm.get('departmentId')?.setValue(personal.departmentId);
    this.editForm.get('salaire')?.setValue(personal.salary);
    this.editForm.get('fonction')?.setValue(personal.fonction);
    this.editForm.get('contract')?.setValue('cdd');
    console.log(personal.contract);
    
    this.editForm.get('dateStart')?.setValue(personal.dateStart);
    this.editForm.get('dateEnd')?.setValue(personal.dateEnd);  
  }
}
