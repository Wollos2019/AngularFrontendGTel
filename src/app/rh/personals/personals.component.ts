import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Civility } from 'src/app/config/model/civility.model';
import { Country } from 'src/app/config/model/countries.model';
import { Department } from 'src/app/config/model/department.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { passwordGenerate } from 'src/app/util/generate_password';
import { CONTRACT, GENDER, MARITAL, Personal } from '../models/personal.model';
import { RhService } from '../services/rh.service';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.component.html',
  styleUrls: ['./personals.component.scss']
})
export class PersonalsComponent implements OnInit {
  personal= new Personal();
  loading=false;
  submitted=false;
  departemnts!: Department[];
  MARITAL=MARITAL;
  GENDER=GENDER;
  CONTRACT=CONTRACT;

  countries: Country[]=[];
  civilities: Civility[]=[];
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
    email1:['']
  });
  passwordCheck=false;
 
  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private rhService:RhService,
    private configService:ConfigService
    ) { }

  ngOnInit(): void {
    this.getCountry();
    this.getAllCivilities();
    this.getAllDepartments();
    this.editForm.get('email')?.valueChanges.subscribe((data:string)=>{
      this.editForm.get('email1')?.setValue(data);
    })
  }
  get f(): any {
    console.log(this.editForm?.controls);
    
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;
   const {
    firstname,
    lastname,
    address,
    cni,
    cnps,
    country,
    town,
    matrimonial,
    phone,
    email,
    numberChild,
    dateNaissance,
    sexe,
    civilite,
    password,
    fonction,
    contrat,
    email1,
    dateStart,
    dateEnd,
  }=this.editForm.value;

  this.personal.address=address;
  this.personal.numberChild=numberChild;
  this.personal.countryId=country;
  this.personal.email=email1?email1:email;
  this.personal.marital=matrimonial;
  this.personal.birthday=dateNaissance;
  this.personal.gender=sexe;
  this.personal.phone=phone;
  this.personal.cni=cni;
  this.personal.town=town;
  this.personal.firstname=firstname;
  this.personal.lastname=lastname;
  this.personal.cnps=cnps;
  this.personal.civility=civilite;
  this.personal.contract=contrat;
  this.personal.dateEnd=dateEnd;
  this.personal.dateStart=dateStart;
  this.personal.password=password;
  this.personal.fonction=fonction;
  
    if (this.editForm.invalid) {
      return;
    }
    this.loading=true;
    this.rhService.createPersonal(this.personal).subscribe({
      next:()=>{
        this.loading = false;
        this.submitted=false;
        this.toastr.success('Enregistrement effectué!!');
        this.editForm.reset();
      },
      error:(error)=>{
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la création",
          'Error'
        );
      }
    });

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
  getValueSpace(ev:any):void{
    console.log('##########',ev.target.checked);
    this.passwordCheck=ev.target.checked;
    if(ev.target.checked){
      this.editForm.get('email1')?.addValidators([Validators.required,Validators.email]);
      this.editForm.get('password')?.addValidators([Validators.required,Validators.minLength(6)]);

      this.editForm.updateValueAndValidity();
      this.editForm.get('password')?.setValue(passwordGenerate(8))
    }else{
      this.editForm.get('email1')?.addValidators([]);
      this.editForm.get('password')?.addValidators([]);
      this.editForm.updateValueAndValidity();
    }
  }
}
