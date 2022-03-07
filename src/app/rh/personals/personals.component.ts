import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { iif } from 'rxjs';
import { Civility } from 'src/app/config/model/civility.model';
import { Contract } from 'src/app/config/model/contract.model';
import { Country } from 'src/app/config/model/countries.model';
import { Department } from 'src/app/config/model/department.model';
import { Fonction } from 'src/app/config/model/fonctions.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { passwordGenerate } from 'src/app/util/generate_password';
import { extractErrorMessagesFromErrorResponse } from 'src/app/util/http_error_response';
import { CONTRACT, GENDER, MARITAL, Personal } from '../models/personal.model';
import { RhService } from '../services/rh.service';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.component.html',
  styleUrls: ['./personals.component.scss'],
})
export class PersonalsComponent implements OnInit {
  personal = new Personal();
  loading = false;
  submitted = false;
  departemnts!: Department[];
  MARITAL = MARITAL;
  GENDER = GENDER;
  CONTRACT = CONTRACT;
  imagePersonel: any;

  countries: Country[] = [];
  civilities: Civility[] = [];
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
    fonctionId: [{ value: '', disabled: true }, [Validators.required]],
    salaire: ['', [Validators.required]],
    contractId: ['', [Validators.required]],
    dateStart: ['', [Validators.required]],
    dateEnd: [''],
    password: [''],
    email1: [''],
    placeBirth: [''],
  });
  passwordCheck = false;
  fonctions!: Fonction[];
  contracts!: Fonction[];
  objectContract = new Contract();
  contractSelect!: Contract;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private rhService: RhService,
    private configService: ConfigService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getCountry();
    this.getAllCivilities();
    this.getAllDepartments();
    this.getAllContracts();
    this.getAllFonctions();
    this.editForm.get('email')?.valueChanges.subscribe((data: string) => {
      this.editForm.get('email1')?.setValue(data);
    });
    this.editForm
      .get('contractId')
      ?.valueChanges.subscribe((data: Contract) => {
        this.contractSelect = data;
        if (data.term !== 0 && this.contractSelect) {
          this.editForm.get('dateEnd')?.addValidators([Validators.required]);
          this.editForm.updateValueAndValidity();
        } else {
          this.editForm.get('dateEnd')?.addValidators([]);
          this.editForm.updateValueAndValidity();
        }
      });
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
      email1,
      placeBirth,
    } = this.editForm.value;

    this.personal.address = address;
    this.personal.numberChild = numberChild;
    this.personal.countryId = country;
    this.personal.email = email1 ? email1 : email;
    this.personal.marital = matrimonial;
    this.personal.birthday = dateNaissance;
    this.personal.gender = sexe;
    this.personal.phone = phone;
    this.personal.cni = cni;
    this.personal.town = town;
    this.personal.firstname = firstname;
    this.personal.lastname = lastname;
    this.personal.cnps = cnps;
    this.personal.civilityId = civilite;

    this.personal.password = password;

    this.personal.placeBirth = placeBirth;

    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;

    this.rhService.createPersonal(this.personal).subscribe({
      next: (personal: Personal) => {
        this.loading = false;
        this.submitted = false;

        if (this.imagePersonel) {
          const dataImage = new FormData();
          dataImage.append(
            'image',
            this.imagePersonel,
            this.imagePersonel.name
          );

          this.rhService
            .uploadPhotoPersonal(personal?.id, dataImage)
            .subscribe({
              next: () => {
                this.editForm.reset();
                this.toastr.success('Enregistrement effectué!!');
                this.router.navigate(['/rh/personals/list']);
              },
              error: () => {
                this.toastr.error(
                  "Une Erreur c'est produite lors  du téléchargement de photo",
                  'Error'
                );
              },
            });
        } else {
          this.editForm.reset();
          this.toastr.success('Enregistrement effectué!!');
          this.router.navigate(['/rh/personals/list']);
        }
        // this.editForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 422) {
          const messages = extractErrorMessagesFromErrorResponse(error);
          let re = '';
          console.error('Error', messages);
          messages.forEach((element) => {
            re = re + '\n ' + element;
          });
          this.toastr.error(re, 'Error');
        } else {
          this.toastr.error(
            "Une Erreur c'est produite lors de la création",
            'Error'
          );
        }
      },
    });
  }

  getCountry(): void {
    this.configService.getAllCountries('per_page=*').subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.editForm.get('country')?.enable();
        this.editForm.updateValueAndValidity();
        console.log(countries);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
  getAllCivilities(): void {
    this.configService.getAllCivilities('per_page=*').subscribe({
      next: (civilities: Civility[]) => {
        this.civilities = civilities;
        this.editForm.get('civilite')?.enable();
        this.editForm.updateValueAndValidity();

        console.log(civilities);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
  getAllContracts(): void {
    this.configService.getAllContracts('per_page=*').subscribe({
      next: (contracts: Fonction[]) => {
        this.contracts = contracts;
        this.editForm.get('contractId')?.enable();
        this.editForm.updateValueAndValidity();

        console.log(contracts);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getAllFonctions(): void {
    this.configService.getAllFonctions('per_page=*').subscribe({
      next: (fonctions: Fonction[]) => {
        this.fonctions = fonctions;
        this.editForm.get('fonctionId')?.enable();
        this.editForm.updateValueAndValidity();

        console.log('fonctions', fonctions);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getAllDepartments(): void {
    this.configService.getAllDepartments('per_page=*').subscribe({
      next: (departemnts: Department[]) => {
        this.departemnts = departemnts;
        this.editForm.get('departmentId')?.enable();
        this.editForm.updateValueAndValidity();

        console.log('departemnts', departemnts);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }
  getValueSpace(ev: any): void {
    console.log('##########', ev.target.checked);
    this.passwordCheck = ev.target.checked;
    if (ev.target.checked) {
      this.editForm
        .get('email1')
        ?.addValidators([Validators.required, Validators.email]);
      this.editForm
        .get('password')
        ?.addValidators([Validators.required, Validators.minLength(6)]);

      this.editForm.updateValueAndValidity();
      this.editForm.get('password')?.setValue(passwordGenerate(8));
    } else {
      this.editForm.get('email1')?.addValidators([]);
      this.editForm.get('password')?.addValidators([]);
      this.editForm.updateValueAndValidity();
    }
  }

  getImage(event: any): void {
    console.log(event);
    this.imagePersonel = event;
    const dataImage = new FormData();

    dataImage.append('image', this.imagePersonel, this.imagePersonel.name);
  }
}
