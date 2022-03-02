import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Civility } from 'src/app/config/model/civility.model';
import { Country } from 'src/app/config/model/countries.model';
import { Department } from 'src/app/config/model/department.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { extractErrorMessagesFromErrorResponse } from 'src/app/util/http_error_response';
import { getImage } from 'src/app/util/images';
import { CONTRACT, GENDER, MARITAL, Personal } from '../../models/personal.model';
import { RhService } from '../../services/rh.service';
declare var $: any;
@Component({
  selector: 'app-personal-profil',
  templateUrl: './personal-profil.component.html',
  styleUrls: ['./personal-profil.component.scss']
})
export class PersonalProfilComponent implements OnInit {
  personalId?: number;
  images?: any;
  personal?: Personal;
  loading = false;
  submitted = false;
  per = new Personal();

  departemnts!: Department[];
  editForm = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: [''],
    email: [''],
    sexe: [GENDER.MALE, [Validators.required]],
    cni: ['', [Validators.required]],
    cnps: [''],
    matrimonial: ['', [Validators.required]],
    town: [''],
    country: [{ value: '', disabled: true }, [Validators.required]],
    address: [''],
    phone: [''],
    numberChild: [0],
    dateNaissance: ['', [Validators.required]],
    civilite: [{ value: '', disabled: true }, [Validators.required]],
    departmentId: [{ value: '', disabled: true }, [Validators.required]],
    salaire: ['', [Validators.required]],
    fonction: ['', [Validators.required]],
    contrat: ['', [Validators.required]],
    dateStart: ['', [Validators.required]],
    dateEnd: [''],
    password: [''],
    email1: [''],
    placeBirth: ['']
  });
  countries!: Country[];
  civilities!: Civility[];
  MARITAL = MARITAL;
  GENDER = GENDER;
  CONTRACT = CONTRACT;
  imagePersonel: any;
  constructor(private toastr: ToastrService, private activeRoute: ActivatedRoute, private rhService: RhService, private fb: FormBuilder,
    private configService: ConfigService, private router:Router) { }

  ngOnInit(): void {
    this.personalId = this.activeRoute.snapshot.params['personalId'];
    this.images = getImage();
    this.getPersonale();
    this.getCountry();
    this.getAllCivilities();
    this.getAllDepartments();

  }
  get f(): any {

    return this.editForm?.controls;
  }
  getPersonale(): void {
    this.rhService.getOnePersonal(Number(this.personalId)).subscribe({
      next: (personal: Personal) => {
        this.personal = personal;

        this.initForm(personal);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);


      }
    })
  }
  getCountry(): void {
    this.configService.getAllCountries('per_page=*').subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.editForm.get('country')?.enable();
        this.editForm.updateValueAndValidity();
     

      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);

      }
    })
  }
  getAllCivilities(): void {
    this.configService.getAllCivilities('per_page=*').subscribe({
      next: (civilities: Civility[]) => {
        this.civilities = civilities;
        this.editForm.get('civilite')?.enable();
        this.editForm.updateValueAndValidity();


      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);

      }
    })
  }

  getAllDepartments(): void {
    this.configService.getAllDepartments('per_page=*').subscribe({
      next: (departemnts: Department[]) => {
        this.departemnts = departemnts;
        this.editForm.get('departmentId')?.enable();
        this.editForm.updateValueAndValidity();

      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);

      }
    })
  }

  initForm(personal: Personal): void {
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
    this.editForm.get('contrat')?.setValue(personal.contract);
    console.log(personal.contract);
    
    this.editForm.get('dateStart')?.setValue(personal.dateStart);
    this.editForm.get('dateEnd')?.setValue(personal.dateEnd);
    this.per.id=personal.id;
  }

  update(): void {
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
      departmentId,
      placeBirth,
      salaire

    } = this.editForm.value;

    this.per.address = address;
    this.per.numberChild = numberChild;
    this.per.countryId = country;
    this.per.email = email1 ? email1 : email;
    this.per.marital = matrimonial;
    this.per.birthday = dateNaissance;
    this.per.gender = sexe;
    this.per.phone = phone;
    this.per.cni = cni;
    this.per.town = town;
    this.per.firstname = firstname;
    this.per.lastname = lastname;
    this.per.cnps = cnps;
    this.per.civilityId = civilite;
    this.per.contract = contrat;
    this.per.dateEnd = dateEnd;
    this.per.dateStart = dateStart;
    this.per.password = password;
    this.per.fonction = fonction;
    this.per.departmentId = departmentId;
    this.per.placeBirth = placeBirth;
    this.per.salary = salaire;
    this.per._method="PUT";

    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.per);
    this.rhService.updatePersonal(this.per).subscribe({
      next: (personal: Personal) => {
        this.loading = false;
        this.submitted = false;

        if (this.imagePersonel) {

          const dataImage = new FormData();
          dataImage.append('image', this.imagePersonel, this.imagePersonel.name);

          this.rhService.uploadPhotoPersonal(personal?.id, dataImage).subscribe({
            next: () => {
            
              this.toastr.success('Enregistrement effectué!!');
            }, error: () => {
              this.toastr.error(
                "Une Erreur c'est produite lors  du téléchargement de photo",
                'Error'
              );
            }
          });

        } else {
        
          this.toastr.success('Modification effectué!!');
        }
        // this.editForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 422) {
          const messages = extractErrorMessagesFromErrorResponse(error);
          let re = '';
          messages.forEach(element => {
            re = re + '\n ' + element;
          });
          this.toastr.error(
            re,
            'Error'
          );
        } else {
          this.toastr.error(
            "Une Erreur c'est produite lors de la création",
            'Error'
          );
        }
      }
    });
  }

  getImage(event: any): void {
    this.imagePersonel = event;
    const dataImage = new FormData();

    dataImage.append('image', this.imagePersonel, this.imagePersonel.name);
  }

  deletePersonale(ev:boolean):void{
      console.log(ev);
      this.loading=true;
      if(ev){
        this.rhService.deletePersonal(this.per.id!).subscribe(
          {
            next:()=>{
              this.loading=false;
              if(!this.loading){
                this.router.navigate(['/rh/personals/list']).then(()=>{
                  this.loading=false;
                });
              }
            
            },
            error:()=>{
              this.loading=false;
              this.toastr.error(
                "Une Erreur c'est produite lors de la suppression",
                'Error'
              );

            }
          }
        )
      }
      
  }

  openModalConfirm(id?:number):void{
    $('#confirm').modal('show');
  }
}
